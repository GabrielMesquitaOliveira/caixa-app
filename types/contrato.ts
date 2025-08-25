import { ProdutoResumido } from './produto';

export interface Contrato {
  id: number;
  produtoId: number;
  produto: ProdutoResumido;
  nomePersonalizado: string;
  valorContratado: number;
  prazoContratado: number;
  dataContratacao: string;
  numeroContrato: string;
  status: 'ativo' | 'cancelado' | 'finalizado';
  observacoes: string;
  clienteId: string;
}

export interface ContratoResumido {
  id: number;
  nomePersonalizado: string;
  taxaJurosAnual: number;
  prazoMaximo: number;
}
