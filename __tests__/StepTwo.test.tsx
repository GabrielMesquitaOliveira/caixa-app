import { render } from '@testing-library/react-native';
import React from 'react';
import StepTwo from '../components/StepTwo';

// Mock the useWatch hook
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useWatch: jest.fn(() => ({
    valorContratado: '10000',
    prazoContratado: '12'
  }))
}));

describe('StepTwo Component', () => {
  const mockControl = {} as any;
  const mockErrors = {} as any;
  const mockHandleSubmit = jest.fn();
  const mockOnNextStep = jest.fn();
  const mockOnPrevious = jest.fn();
  const mockOnCancel = jest.fn();
  const mockFormData = { produtoId: '1' };

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
});
