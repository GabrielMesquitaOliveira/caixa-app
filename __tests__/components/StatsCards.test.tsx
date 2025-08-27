import { StatsCards } from '@/components/StatsCards';
import { EstatisticasContratos } from '@/hooks/useHomeData';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('StatsCards Component', () => {
  const mockEstatisticas: EstatisticasContratos = {
    totalContratos: 3,
    saldoTotalDevedor: 15000,
    totalPago: 5000,
    totalPendente: 2000,
    percentualPago: 60
  };

  const mockTotalParcelasPendentes = 5;

  it('renders correctly with statistics data', () => {
    const { getByText } = render(
      <StatsCards 
        estatisticas={mockEstatisticas} 
        totalParcelasPendentes={mockTotalParcelasPendentes} 
      />
    );
    
    expect(getByText('Total Pago')).toBeTruthy();
    expect(getByText('Pendente')).toBeTruthy();
    expect(getByText('R$ 5.000,00')).toBeTruthy();
    expect(getByText('R$ 2.000,00')).toBeTruthy();
    expect(getByText('60% concluído')).toBeTruthy();
    expect(getByText('5 parcela(s)')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <StatsCards 
        estatisticas={mockEstatisticas} 
        totalParcelasPendentes={mockTotalParcelasPendentes} 
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
