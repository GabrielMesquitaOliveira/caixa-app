import { EstatisticasContratos } from '@/hooks/useHomeData';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ChartLegend } from '../components/ChartLegend';

describe('ChartLegend Component', () => {
  const mockEstatisticas: EstatisticasContratos = {
    totalContratos: 3,
    saldoTotalDevedor: 15000,
    totalPago: 5000,
    totalPendente: 2000,
    percentualPago: 60
  };

  it('renders correctly with statistics data', () => {
    const { getByText } = render(<ChartLegend estatisticas={mockEstatisticas} />);
    
    expect(getByText('Distribuição Financeira')).toBeTruthy();
    expect(getByText('Pago')).toBeTruthy();
    expect(getByText('Pendente')).toBeTruthy();
    expect(getByText('Saldo Devedor')).toBeTruthy();
  });

  it('displays formatted currency values', () => {
    const { getByText } = render(<ChartLegend estatisticas={mockEstatisticas} />);
    
    expect(getByText('R$ 5.000,00')).toBeTruthy(); // Pago
    expect(getByText('R$ 2.000,00')).toBeTruthy(); // Pendente
    expect(getByText('R$ 15.000,00')).toBeTruthy(); // Saldo Devedor
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<ChartLegend estatisticas={mockEstatisticas} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
