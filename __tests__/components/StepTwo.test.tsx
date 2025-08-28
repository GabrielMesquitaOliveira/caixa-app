import StepTwo from '@/components/StepTwo';
import { useProdutos } from '@/hooks/useProdutos';
import { gerarTabelaAmortizacao, simularEmprestimo, validarEmprestimo } from '@/utils/financeUtils';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

// Mock completo do react-hook-form
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useWatch: jest.fn(),
  useForm: jest.fn(() => ({
    control: {},
    handleSubmit: jest.fn(),
    formState: { errors: {} },
  })),
  Controller: ({ render }: any) => render({ field: { onChange: jest.fn(), value: '' } }),
}));

// Mock do useProdutos
jest.mock('@/hooks/useProdutos', () => ({
  useProdutos: jest.fn(),
}));

// Mock das funções de utilidade
jest.mock('@/utils/financeUtils', () => ({
  simularEmprestimo: jest.fn(),
  gerarTabelaAmortizacao: jest.fn(),
  validarEmprestimo: jest.fn(),
}));

// Cast mocks to jest.Mock for TypeScript
const mockUseProdutos = useProdutos as jest.Mock;
const mockSimularEmprestimo = simularEmprestimo as jest.Mock;
const mockGerarTabelaAmortizacao = gerarTabelaAmortizacao as jest.Mock;
const mockValidarEmprestimo = validarEmprestimo as jest.Mock;

describe('StepTwo Component', () => {
  const { useWatch } = require('react-hook-form');
  const mockControl = {} as any;
  const mockErrors = {} as any;
  const mockHandleSubmit = jest.fn((callback: any) => callback);
  const mockOnNextStep = jest.fn();
  const mockOnPrevious = jest.fn();
  const mockOnCancel = jest.fn();
  const mockFormData = { produtoId: '1' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useWatch as jest.Mock).mockReturnValue({
      valorContratado: '10000',
      prazoContratado: '12'
    });
    mockUseProdutos.mockReturnValue({
      produtos: [{ id: '1', nome: 'Produto Teste', taxaJurosAnual: 5, prazoMinimo: 6, prazoMaximo: 24, valorMinimo: 1000, valorMaximo: 50000, descricao: 'Descrição do produto', categoria: 'pessoa_fisica' }],
      loading: false,
      error: null,
      refetch: jest.fn(),
      buscarPorCategoria: jest.fn(),
      buscarPorId: jest.fn(),
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <StepTwo
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onPrevious={mockOnPrevious}
        onCancel={mockOnCancel}
        formData={mockFormData}
      />
    );
    
    expect(getByText('Simulação do Empréstimo')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <StepTwo
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onPrevious={mockOnPrevious}
        onCancel={mockOnCancel}
        formData={mockFormData}
      />
    );
    
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls useWatch with correct parameters', () => {
    render(
      <StepTwo
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onPrevious={mockOnPrevious}
        onCancel={mockOnCancel}
        formData={mockFormData}
      />
    );

    expect(useWatch).toHaveBeenCalled();
  });

  it('validates loan correctly and simulates loan', () => {
    mockValidarEmprestimo.mockReturnValue({ valido: true, erros: [] });
    mockSimularEmprestimo.mockReturnValue({ valorParcela: 1000, valorTotal: 12000, taxaMensal: 1 });

    const { getByText } = render(
      <StepTwo
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onPrevious={mockOnPrevious}
        onCancel={mockOnCancel}
        formData={mockFormData}
      />
    );

    expect(mockValidarEmprestimo).toHaveBeenCalled();
    expect(mockSimularEmprestimo).toHaveBeenCalled();
    expect(getByText('Valor da Parcela: R$ 1.000,00')).toBeTruthy();
  });

  it('displays error messages when validation fails', () => {
    mockValidarEmprestimo.mockReturnValue({ valido: false, erros: ['Valor mínimo: R$ 1.000,00'] });

    const { getByText } = render(
      <StepTwo
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onPrevious={mockOnPrevious}
        onCancel={mockOnCancel}
        formData={mockFormData}
      />
    );

    expect(getByText('Atenção:')).toBeTruthy();
    expect(getByText('• Valor mínimo: R$ 1.000,00')).toBeTruthy();
  });

  it('shows loading state when fetching products', () => {
    mockUseProdutos.mockReturnValueOnce({ produtos: [], loading: true, error: null });

    const { getByText } = render(
      <StepTwo
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onPrevious={mockOnPrevious}
        onCancel={mockOnCancel}
        formData={mockFormData}
      />
    );

    expect(getByText('Carregando informações do produto...')).toBeTruthy();
  });

  it('calls onPrevious when "Voltar" button is pressed', () => {
    const { getByText } = render(
      <StepTwo
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onPrevious={mockOnPrevious}
        onCancel={mockOnCancel}
        formData={mockFormData}
      />
    );

    fireEvent.press(getByText('Voltar'));
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it('calls onNextStep when "Próximo" button is pressed', () => {
    mockValidarEmprestimo.mockReturnValue({ valido: true, erros: [] });
    mockSimularEmprestimo.mockReturnValue({ valorParcela: 1000, valorTotal: 12000, taxaMensal: 1 });

    const { getByText } = render(
      <StepTwo
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onPrevious={mockOnPrevious}
        onCancel={mockOnCancel}
        formData={mockFormData}
      />
    );

    fireEvent.press(getByText('Próximo'));
    expect(mockOnNextStep).toHaveBeenCalled();
  });
});
