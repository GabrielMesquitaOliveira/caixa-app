import { ContratoResumido } from './contrato';

export interface ParcelaAmortizacao {
  mes: number;
  juros: number;
  amortizacao: number;
  saldoDevedor: number;
  valorParcela: number;
}

export interface Simulacao {
  id: number;
  contratadoId: number | null;
  contrato: ContratoResumido;
  valorSimulado: number;
  prazoSimulado: number;
  taxaJurosMensal: number;
  valorParcelaMensal: number;
  valorTotalComJuros: number;
  sistemaAmortizacao: 'PRICE' | 'SAC';
  memoriaCalculo: ParcelaAmortizacao[];
  criadoEm: string;
  clienteId: string;
}
