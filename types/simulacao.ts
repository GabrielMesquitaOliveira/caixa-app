import { ContratoResumido } from './contrato';

export interface ParcelaAmortizacao {
  mes: number;
  juros: number;
  amortizacao: number;
  saldoDevedor: number;
  valorParcela: number;
}

export interface Simulacao {
  id: string;
  contratadoId: string | null;
  contrato: ContratoResumido;
  valorSimulado: number;
  prazoSimulado: number;
  taxaJurosMensal: number;
  valorParcelaMensal: number;
  valorTotalComJuros: number;
  sistemaAmortizacao: 'PRICE' | 'SAC';
  memoriaCalculo: ParcelaAmortizacao[];
  criado极Em: string;
  clienteId: string;
}
