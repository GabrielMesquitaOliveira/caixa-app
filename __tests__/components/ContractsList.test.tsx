import { ContractsList } from '@/components/ContractsList';
import { Contrato, Parcela } from '@/services';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('ContractsList Component', () => {
  const mockContratos: Contrato[] = [
    {
      id: '1',
      produtoId: '1',
      produto: {
        id: '1',
        nome: 'Empréstimo Pessoal',
        taxaJurosAnual: 12.5
      },
      nomePersonalizado: 'Empréstimo Pessoal',
      valorContratado: 10000,
      prazoContratado: 12,
      sistemaAmortizacao: 'PRICE',
      taxaJurosMensal: 1.0,
      valorParcelaMensal: 888.49,
      dataVencimentoPrimeiraParcela: '2024-01-15',
      parcelasPagas: 6,
      totalParcelas: 12,
      dataContratacao: '2023-12-15',
      numeroContrato: '12345',
      status: 'ativo',
      observacoes: '',
      clienteId: '1'
    }
  ];

  const mockParcelas: Parcela[] = [
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
      diasAtraso: 0
    },
    {
      id: '2',
      contratoId: '1',
      numeroParcela: 2,
      dataVencimento: '2024-02-15',
      valorParcela: 888.49,
      valorJuros: 76.62,
      valorAmortizacao: 811.87,
      saldoDevedor: 8382.97,
      situacao: 'pendente',
      diasAtraso: 0
    }
  ];

  it('renders correctly', () => {
    const { getByText } = render(<ContractsList contratos={mockContratos} parcelas={mockParcelas} />);
    
    expect(getByText('Seus Empréstimos')).toBeTruthy();
    expect(getByText('Empréstimo Pessoal')).toBeTruthy();
    expect(getByText(/12345/)).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<ContractsList contratos={mockContratos} parcelas={mockParcelas} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
