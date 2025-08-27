import { render } from '@testing-library/react-native';
import React from 'react';
import { Header } from '../components/Header';

describe('Header Component', () => {
  const mockNavigation = {
    goBack: jest.fn(),
    canGoBack: jest.fn(() => true)
  };

  const mockRoute = {
    name: 'Home'
  };

  const mockOptions = {
    title: 'Home',
    numeroConta: 'Ag. 3737 CC.576939466-4',
    showAccountNumber: true
  };

  const mockBack = {
    title: 'Back',
    href: '/'
  };

  it('renders correctly with back button', () => {
    const { getByText } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={mockBack as any}
      />
    );
    
    expect(getByText('Ag. 3737 CC.576939466-4')).toBeTruthy();
  });

  it('renders correctly with menu button (no back)', () => {
    const { getByText } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={undefined}
      />
    );
    
    expect(getByText('Ag. 3737 CC.576939466-4')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={mockBack as any}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
