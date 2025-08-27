import { ErrorScreen } from '@/components/ErrorScreen';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('ErrorScreen Component', () => {
  it('renders correctly with error message', () => {
    const errorMessage = 'Erro ao carregar dados';
    const { getByText } = render(<ErrorScreen error={errorMessage} />);
    
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<ErrorScreen error="Erro de teste" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
