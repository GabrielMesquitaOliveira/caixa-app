import LoanAccordion from '@/components/LoanAccordion';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('LoanAccordion Component', () => {
  const mockContrato = {
    valorContratado: 10000,
    dataContratacao: '2024-01-15',
    sistemaAmortizacao: 'PRICE',
    taxaJurosMensal: 1.0,
    taxaJurosAnual: 12.5,
    prazoContratado: 12,
    parcelasPagas: 6,
    saldoDevedor: 5000,
    dataUltimoVencimento: '2024-06-15',
    cetMensal: 1.2,
    cetAnual: 15.0
  };

  it('renders correctly with contract data', () => {
    const { getByText } = render(<LoanAccordion contrato={mockContrato} />);
    
    expect(getByText('Detalhes do Empréstimo')).toBeTruthy();
    expect(getByText('R$ 10.000,00')).toBeTruthy();
    expect(getByText('PRICE')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<LoanAccordion contrato={mockContrato} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
