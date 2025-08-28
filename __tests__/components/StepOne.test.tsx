import StepOne from '@/components/StepOne';
import { render } from '@testing-library/react-native';
import React from 'react';

// Mock the useProdutos hook
jest.mock('@/hooks/useProdutos', () => ({
  useProdutos: () => ({
    produtos: [
      {
        id: '1',
        nome: 'Empréstimo Pessoal',
        taxaJurosAnual: 12.5,
        prazoMinimo: 6,
        prazoMaximo: 36,
        valorMinimo: 1000,
        valorMaximo: 50000,
        descricao: 'Empréstimo para pessoa física',
        categoria: 'pessoa_fisica'
      }
    ],
    loading: false,
    error: null
  })
}));

describe('StepOne Component', () => {
  const mockControl = {} as any;
  const mockErrors = {} as any;
  const mockHandleSubmit = jest.fn();
  const mockOnNextStep = jest.fn();
  const mockOnCancel = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(
      <StepOne 
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onCancel={mockOnCancel}
      />
    );
    
    expect(getByText('Escolha sua Modalidade')).toBeTruthy();
    expect(getByText('Empréstimo Pessoal')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <StepOne 
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onCancel={mockOnCancel}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
