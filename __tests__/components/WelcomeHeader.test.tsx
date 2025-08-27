import { WelcomeHeader } from '@/components/WelcomeHeader';
import { Usuario } from '@/services';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('WelcomeHeader Component', () => {
  const mockUsuario: Usuario = {
    id: '1',
    nome: 'João Silva',
    email: 'joao@example.com',
    telefone: '123456789',
    profissao: 'Desenvolvedor',
    criadoEm: '2023-01-01'
  };

  it('renders correctly with user data', () => {
    const { getByText } = render(<WelcomeHeader usuario={mockUsuario} />);
    
    expect(getByText('Olá, João!')).toBeTruthy();
    expect(getByText('Desenvolvedor')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<WelcomeHeader usuario={mockUsuario} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
