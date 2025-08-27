import { FinancialSummaryCard } from '@/components/FinancialSummaryCard';
import { EstatisticasContratos } from '@/hooks/useHomeData';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('FinancialSummaryCard Component', () => {
  const mockEstatisticas: EstatisticasContratos = {
    totalContratos: 3,
    saldoTotalDevedor: 15000,
    totalPago: 5000,
    totalPendente: 2000,
    percentualPago: 60
  };

  it('renders correctly with statistics data', () => {
    const { getByText } = render(<FinancialSummaryCard estatisticas={mockEstatisticas} />);
    
    expect(getByText('Saldo Devedor')).toBeTruthy();
    expect(getByText('R$ 15.000,00')).toBeTruthy();
    expect(getByText('3 contrato(s) ativo(s)')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<FinancialSummaryCard estatisticas={mockEstatisticas} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
