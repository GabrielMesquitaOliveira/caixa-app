export interface Parcela {
  id: string;
  contratoId: string;
  numeroParcela: number;
  dataVencimento: string;
  valorParcela: number;
  valorJuros: number;
  valorAmortizacao: number;
  saldoDevedor: number;
  dataPagamento?: string | null;
  valorPago?: number | null;
  situacao: 'paga' | 'pendente' | 'vencida' | 'cancelada';
  diasAtraso: number;
}

export interface CreateParcelaRequest {
  contratoId: number;
  numeroParcela: number;
  dataVencimento: string;
  valorParcela: number;
  valorJuros: number;
  valorAmortizacao: number;
  saldoDevedor: number;
  situacao: 'pendente';
  diasAtraso: 0;
}

export interface PagarParcelaRequest {
  dataPagamento: string;
  valorPago: number;
  situacao: 'paga';
  diasAtraso?: number;
}

export interface FiltrosParcelas {
  contratoId?: string;
  situacao?: 'paga' | 'pendente' | 'vencida' | 'cancelada';
  numeroParcela?: number;
  dataVencimentoInicio?: string;
  dataVencimentoFim?: string;
  clienteId?: string;
}