import { ContratoResumido } from './contrato';
import { ProdutoResumido } from './produto';
import { ParcelaAmortizacao } from './simulacao';

export interface CreateContratoRequest {
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

export interface CreateSimulacaoRequest {
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

export interface CreateUsuarioRequest {
  nome: string;
  email: string;
  telefone: string;
  profissao: string;
  criadoEm: string;
}

export interface SimulacaoCalculada {
  valorParcela: number;
  valorTotal: number;
  taxaMensal: number;
}

export interface ValidacaoEmprestimo {
  valido: boolean;
  erros: string[];
}

export interface ErroApi {
  tipo: 'response' | 'network' | 'config';
  status?: number;
  mensagem: string;
  dados?: any;
}
