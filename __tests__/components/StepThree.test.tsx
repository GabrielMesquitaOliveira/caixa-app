import StepThree from '@/components/StepThree';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('StepThree Component', () => {
  const mockControl = {} as any;
  const mockErrors = {} as any;
  const mockHandleSubmit = jest.fn();
  const mockOnNextStep = jest.fn();
  const mockOnPrevious = jest.fn();
  const mockOnCancel = jest.fn();
  const mockFormData = {
    valorContratado: 10000,
    prazoContratado: 12,
    sistemaAmortizacao: 'PRICE',
    dataVencimento: '15/01/2024'
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <StepThree 
        control={mockControl}
        errors={mockErrors}
        handleSubmit={mockHandleSubmit}
        onNextStep={mockOnNextStep}
        onPrevious={mockOnPrevious}
        onCancel={mockOnCancel}
        formData={mockFormData}
      />
    );
    
    expect(getByText('Aceitar Contrato')).toBeTruthy();
    expect(getByText('Resumo do Contrato')).toBeTruthy();
    expect(getByText('R$ 10.000,00')).toBeTruthy();
    expect(getByText('12 meses')).toBeTruthy();
    expect(getByText('PRICE')).toBeTruthy();
    expect(getByText('15/01/2024')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <StepThree 
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
});
