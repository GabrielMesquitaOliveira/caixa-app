import { render } from '@testing-library/react-native';
import React from 'react';
import MultiStepForm from '../components/MultiStepForm';

describe('MultiStepForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(<MultiStepForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    expect(getByText('1')).toBeTruthy(); // Check if step indicator is rendered
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<MultiStepForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
