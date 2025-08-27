import StepOne from '@/components/StepOne';
import { render } from '@testing-library/react-native';
import React from 'react';

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
