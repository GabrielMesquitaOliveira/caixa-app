import { ProdutoResumido } from './produto';

// Interface principal do Contrato
export interface Contrato {
  id: string;
  produtoId: number;
  produto: ProdutoResumido;
  nomePersonalizado: string;
  valorContratado: number;
  prazoContratado: number;
  sistemaAmortizacao: 'PRICE' | 'SAC';
  taxaJurosMensal: number;
  valorParcelaMensal: number;
  dataVencimentoPrimeiraParcela: string;
  parcelasPagas: number;
  totalParcelas: number;
  dataContratacao: string;
  numeroContrato: string;
  status: 'ativo' | 'cancelado' | 'finalizado';
  observacoes: string;
  clienteId: string;
}

// Interface para resumo do contrato
export interface ContratoResumido {
  id: string;
  nomePersonalizado: string;
  taxaJurosAnual: number;
  prazoMaximo: number;
  sistemaAmortizacao?: 'PRICE' | 'SAC';
  valorContratado?: number;
  parcelasPagas?: number;
  totalParcelas?: number;
}

// Interface para criar um novo contrato
export interface CreateContratoRequest {
  produtoId: number;
  nomePersonalizado: string;
  valorContratado: number;
  prazoContratado: number;
  sistemaAmortizacao: 'PRICE' | 'SAC';
  taxaJurosMensal: number;
  valorParcelaMensal: number;
  dataVencimentoPrimeiraParcela: string;
  observacoes?: string;
  clienteId: string;
}

// Interface para atualizar contrato
export interface UpdateContratoRequest {
  nomePersonalizado?: string;
  observacoes?: string;
  status?: 'ativo' | 'cancelado' | 'finalizado';
  parcelasPagas?: number;
}

// Interface para filtros de contrato
export interface FiltrosContrato {
  clienteId?: string;
  status?: 'ativo' | 'cancelado' | 'finalizado';
  sistemaAmortizacao?: 'PRICE' | 'SAC';
  produtoId?: number;
  dataContratacaoInicio?: string;
  dataContratacaoFim?: string;
  valorMinimoContratado?: number;
  valorMaximoContratado?: number;
}

// Interface para estatísticas do contrato
export interface EstatisticasContrato {
  contratoId: string;
  nomeContrato: string;
  valorOriginal: number;
  saldoDevedor: number;
  valorTotalPago: number;
  valorTotalPendente: number;
  parcelasPagas: number;
  parcelasPendentes: number;
  parcelasVencidas: number;
  percentualConcluido: number;
  diasAtraso: number;
  proximoVencimento: string | null;
  sistemaAmortizacao: 'PRICE' | 'SAC';
}

// Interface para progresso do contrato
export interface ProgressoContrato {
  contratoId: string;
  parcelaAtual: number;
  totalParcelas: number;
  percentualConcluido: number;
  valorPago: number;
  saldoRestante: number;
  diasEmAtraso: number;
  statusPagamento: 'em_dia' | 'em_atraso' | 'finalizado';
  proximaParcelaVencimento: string | null;
  proximaParcelaValor: number | null;
}

// Interface para dashboard/resumo de contratos
export interface ResumoContratos {
  totalContratos: number;
  contratosAtivos: number;
  contratosFinalizados: number;
  contratosCancelados: number;
  valorTotalContratado: number;
  valorTotalPago: number;
  saldoTotalDevedor: number;
  contratosPRICE: number;
  contratosSAC: number;
  mediaPercentualConclusao: number;
}

// Interface para histórico de alterações do contrato
export interface HistoricoContrato {
  id: string;
  contratoId: string;
  dataAlteracao: string;
  tipoAlteracao: 'criacao' | 'pagamento' | 'cancelamento' | 'finalizacao' | 'observacao';
  valorAnterior?: any;
  valorNovo?: any;
  observacao?: string;
  usuarioId?: string;
}

// Enums para melhor organização
export enum StatusContrato {
  ATIVO = 'ativo',
  CANCELADO = 'cancelado',
  FINALIZADO = 'finalizado'
}

export enum SistemaAmortizacao {
  PRICE = 'PRICE',
  SAC = 'SAC'
}

export enum TipoAlteracaoContrato {
  CRIACAO = 'criacao',
  PAGAMENTO = 'pagamento',
  CANCELAMENTO = 'cancelamento',
  FINALIZACAO = 'finalizacao',
  OBSERVACAO = 'observacao'
}

export default Contrato;
