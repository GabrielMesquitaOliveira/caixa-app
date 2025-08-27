import { LoadingScreen } from '@/components/LoadingScreen';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('LoadingScreen Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LoadingScreen />);
    // Add assertions based on the expected output
    expect(getByText('Expected Text')).toBeTruthy(); // Replace 'Expected Text' with actual text
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<LoadingScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
