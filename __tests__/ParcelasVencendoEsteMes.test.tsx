import { ParcelaComContrato } from '@/hooks/useHomeData';
import { render } from '@testing-library/react-native';
import React from 'react';
import ParcelasVencendoEsteMes from '../components/ParcelasVencendoEsteMes';

describe('ParcelasVencendoEsteMes Component', () => {
  const mockParcelas: ParcelaComContrato[] = [
    {
      id: '1',
      contratoId: '1',
      numeroParcela: 1,
      dataVencimento: '2024-01-15',
      valorParcela: 888.49,
      valorJuros: 83.33,
      valorAmortizacao: 805.16,
      saldoDevedor: 9194.84,
      dataPagamento: '2024-01-15',
      valorPago: 888.49,
      situacao: 'paga',
      diasAtraso: 0,
      contratoNome: 'Empréstimo Pessoal',
      contratoNumero: '12345'
    }
  ];

  it('renders correctly with parcelas data', () => {
    const { getByText } = render(<ParcelasVencendoEsteMes parcelas={mockParcelas} />);
    
    expect(getByText('Parcelas Vencendo Este Mês')).toBeTruthy();
    expect(getByText('Empréstimo Pessoal')).toBeTruthy();
    expect(getByText('R$ 888,49')).toBeTruthy();
  });

  it('renders empty state when no parcelas', () => {
    const { getByText } = render(<ParcelasVencendoEsteMes parcelas={[]} />);
    
    expect(getByText('Parcelas Vencendo Este Mês')).toBeTruthy();
    expect(getByText('Nenhuma parcela vencendo este mês.')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<ParcelasVencendoEsteMes parcelas={mockParcelas} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
