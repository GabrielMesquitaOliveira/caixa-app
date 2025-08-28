import { LoadingScreen } from '@/components/LoadingScreen';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('LoadingScreen Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LoadingScreen />);
    expect(getByText('Carregando...')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<LoadingScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
