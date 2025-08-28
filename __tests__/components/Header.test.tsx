import { Header } from '@/components/Header';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with back button', () => {
    const { getByText, getByTestId } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={mockBack as any}
      />
    );
    
    expect(getByText('Ag. 3737 CC.576939466-4')).toBeTruthy();
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('renders correctly with menu button (no back)', () => {
    const { getByText, getByTestId } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={undefined}
      />
    );
    
    expect(getByText('Ag. 3737 CC.576939466-4')).toBeTruthy();
    expect(getByTestId('menu-button')).toBeTruthy();
  });

  it('renders title when showAccountNumber is false', () => {
    const { getByText } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={{ ...mockOptions, showAccountNumber: false }}
        back={mockBack as any}
      />
    );
    
    expect(getByText('Home')).toBeTruthy();
  });

  it('uses default numeroConta when not provided', () => {
    const { getByText } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={{ ...mockOptions, numeroConta: undefined }}
        back={mockBack as any}
      />
    );
    
    expect(getByText('Ag. 3737 CC.576939466-4')).toBeTruthy();
  });

  it('uses route name as title when title is not provided', () => {
    const { getByText } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={{ ...mockOptions, title: undefined, showAccountNumber: false }}
        back={mockBack as any}
      />
    );
    
    expect(getByText('Home')).toBeTruthy();
  });

  it('calls navigation.goBack when back button is pressed and can go back', () => {
    mockNavigation.canGoBack.mockReturnValue(true);
    const { getByTestId } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={mockBack as any}
      />
    );

    fireEvent.press(getByTestId('back-button'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('does not call navigation.goBack when back button is pressed but cannot go back', () => {
    mockNavigation.canGoBack.mockReturnValue(false);
    const { getByTestId } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={mockBack as any}
      />
    );

    fireEvent.press(getByTestId('back-button'));
    expect(mockNavigation.goBack).not.toHaveBeenCalled();
  });

  it('calls custom onMenuPress callback when menu button is pressed', () => {
    const mockOnMenuPress = jest.fn();
    const { getByTestId } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={{ ...mockOptions, onMenuPress: mockOnMenuPress }}
        back={undefined}
      />
    );

    fireEvent.press(getByTestId('menu-button'));
    expect(mockOnMenuPress).toHaveBeenCalled();
  });

  it('logs to console when menu button is pressed without custom callback', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByTestId } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={undefined}
      />
    );

    fireEvent.press(getByTestId('menu-button'));
    expect(consoleSpy).toHaveBeenCalledWith('Menu pressed');
    consoleSpy.mockRestore();
  });

  it('calls custom onNotificacoesPress callback when notifications button is pressed', () => {
    const mockOnNotificacoesPress = jest.fn();
    const { getByTestId } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={{ ...mockOptions, onNotificacoesPress: mockOnNotificacoesPress }}
        back={mockBack as any}
      />
    );

    fireEvent.press(getByTestId('notifications-button'));
    expect(mockOnNotificacoesPress).toHaveBeenCalled();
  });

  it('logs to console when notifications button is pressed without custom callback', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByTestId } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={mockBack as any}
      />
    );

    fireEvent.press(getByTestId('notifications-button'));
    expect(consoleSpy).toHaveBeenCalledWith('Notificações pressed');
    consoleSpy.mockRestore();
  });

  it('matches snapshot with back button', () => {
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

  it('matches snapshot with menu button', () => {
    const { toJSON } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={mockOptions as any}
        back={undefined}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with custom title', () => {
    const { toJSON } = render(
      <Header 
        navigation={mockNavigation as any}
        route={mockRoute as any}
        options={{ ...mockOptions, showAccountNumber: false }}
        back={mockBack as any}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
