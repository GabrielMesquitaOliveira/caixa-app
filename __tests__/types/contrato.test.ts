import {
    Contrato,
    ContratoResumido,
    CreateContratoRequest,
    EstatisticasContrato,
    FiltrosContrato,
    HistoricoContrato,
    ProgressoContrato,
    ResumoContratos,
    SistemaAmortizacao,
    StatusContrato,
    TipoAlteracaoContrato,
    UpdateContratoRequest
} from '@/types/contrato';

describe('Contrato Types', () => {
  describe('Contrato', () => {
    it('should have correct structure', () => {
      const contrato: Contrato = {
        id: 'contrato-123',
        produtoId: 'produto-1',
        produto: {
          id: 'produto-1',
          nome: 'Empréstimo Pessoal',
          taxaJurosAnual: 12.5
        },
        nomePersonalizado: 'Meu Empréstimo',
        valorContratado: 10000,
        prazoContratado: 12,
        sistemaAmortizacao: 'PRICE',
        taxaJurosMensal: 1.0,
        valorParcelaMensal: 888.49,
        dataVencimentoPrimeiraParcela: '2024-02-01',
        parcelasPagas: 0,
        totalParcelas: 12,
        dataContratacao: '2024-01-01',
        numeroContrato: 'CONTR001',
        status: 'ativo',
        observacoes: 'Contrato de teste',
        clienteId: 'cliente-123'
      };

      expect(contrato).toHaveProperty('id');
      expect(contrato).toHaveProperty('produtoId');
      expect(contrato).toHaveProperty('produto');
      expect(contrato).toHaveProperty('nomePersonalizado');
      expect(contrato).toHaveProperty('valorContratado');
      expect(contrato).toHaveProperty('prazoContratado');
      expect(contrato).toHaveProperty('sistemaAmortizacao');
      expect(contrato).toHaveProperty('taxaJurosMensal');
      expect(contrato).toHaveProperty('valorParcelaMensal');
      expect(contrato).toHaveProperty('dataVencimentoPrimeiraParcela');
      expect(contrato).toHaveProperty('parcelasPagas');
      expect(contrato).toHaveProperty('totalParcelas');
      expect(contrato).toHaveProperty('dataContratacao');
      expect(contrato).toHaveProperty('numeroContrato');
      expect(contrato).toHaveProperty('status');
      expect(contrato).toHaveProperty('observacoes');
      expect(contrato).toHaveProperty('clienteId');
    });

    it('should allow valid status values', () => {
      const contratoAtivo: Contrato = {
        id: '1',
        produtoId: '1',
        produto: { id: '1', nome: 'Test', taxaJurosAnual: 10 },
        nomePersonalizado: 'Test',
        valorContratado: 1000,
        prazoContratado: 6,
        sistemaAmortizacao: 'PRICE',
        taxaJurosMensal: 0.83,
        valorParcelaMensal: 170.58,
        dataVencimentoPrimeiraParcela: '2024-01-01',
        parcelasPagas: 0,
        totalParcelas: 6,
        dataContratacao: '2024-01-01',
        numeroContrato: 'TEST',
        status: 'ativo',
        observacoes: '',
        clienteId: 'test'
      };

      const contratoCancelado: Contrato = {
        ...contratoAtivo,
        status: 'cancelado'
      };

      const contratoFinalizado: Contrato = {
        ...contratoAtivo,
        status: 'finalizado'
      };

      expect(contratoAtivo.status).toBe('ativo');
      expect(contratoCancelado.status).toBe('cancelado');
      expect(contratoFinalizado.status).toBe('finalizado');
    });
  });

  describe('ContratoResumido', () => {
    it('should have correct structure', () => {
      const resumo: ContratoResumido = {
        id: 'contrato-123',
        nomePersonalizado: 'Meu Empréstimo',
        taxaJurosAnual: 12.5,
        prazoMaximo: 36
      };

      const resumoCompleto: ContratoResumido = {
        ...resumo,
        sistemaAmortizacao: 'PRICE',
        valorContratado: 10000,
        parcelasPagas: 5,
        totalParcelas: 12
      };

      expect(resumo).toHaveProperty('id');
      expect(resumo).toHaveProperty('nomePersonalizado');
      expect(resumo).toHaveProperty('taxaJurosAnual');
      expect(resumo).toHaveProperty('prazoMaximo');
      
      expect(resumoCompleto.sistemaAmortizacao).toBe('PRICE');
      expect(resumoCompleto.valorContratado).toBe(10000);
    });
  });

  describe('CreateContratoRequest', () => {
    it('should have correct structure', () => {
      const request: CreateContratoRequest = {
        produtoId: 1,
        nomePersonalizado: 'Meu Empréstimo',
        valorContratado: 10000,
        prazoContratado: 12,
        sistemaAmortizacao: 'PRICE',
        taxaJurosMensal: 1.0,
        valorParcelaMensal: 888.49,
        dataVencimentoPrimeiraParcela: '2024-02-01',
        observacoes: 'Contrato de teste',
        clienteId: 'cliente-123'
      };

      expect(request).toHaveProperty('produtoId');
      expect(request).toHaveProperty('nomePersonalizado');
      expect(request).toHaveProperty('valorContratado');
      expect(request).toHaveProperty('prazoContratado');
      expect(request).toHaveProperty('sistemaAmortizacao');
      expect(request).toHaveProperty('taxaJurosMensal');
      expect(request).toHaveProperty('valorParcelaMensal');
      expect(request).toHaveProperty('dataVencimentoPrimeiraParcela');
      expect(request).toHaveProperty('clienteId');
    });
  });

  describe('UpdateContratoRequest', () => {
    it('should have correct structure with optional properties', () => {
      const update: UpdateContratoRequest = {
        nomePersonalizado: 'Novo Nome',
        observacoes: 'Nova observação',
        status: 'cancelado',
        parcelasPagas: 5
      };

      const partialUpdate: UpdateContratoRequest = {
        observacoes: 'Apenas observação'
      };

      expect(update).toHaveProperty('nomePersonalizado');
      expect(update).toHaveProperty('observacoes');
      expect(update).toHaveProperty('status');
      expect(update).toHaveProperty('parcelasPagas');
      
      expect(partialUpdate.observacoes).toBe('Apenas observação');
      expect(partialUpdate.status).toBeUndefined();
    });
  });

  describe('FiltrosContrato', () => {
    it('should have correct structure with optional properties', () => {
      const filtros: FiltrosContrato = {
        clienteId: 'cliente-123',
        status: 'ativo',
        sistemaAmortizacao: 'PRICE',
        produtoId: 1,
        dataContratacaoInicio: '2024-01-01',
        dataContratacaoFim: '2024-12-31',
        valorMinimoContratado: 1000,
        valorMaximoContratado: 50000
      };

      const partialFiltros: FiltrosContrato = {
        status: 'ativo'
      };

      expect(filtros).toHaveProperty('clienteId');
      expect(filtros).toHaveProperty('status');
      expect(filtros).toHaveProperty('sistemaAmortizacao');
      expect(filtros).toHaveProperty('produtoId');
      expect(filtros).toHaveProperty('dataContratacaoInicio');
      expect(filtros).toHaveProperty('dataContratacaoFim');
      expect(filtros).toHaveProperty('valorMinimoContratado');
      expect(filtros).toHaveProperty('valorMaximoContratado');
      
      expect(partialFiltros.status).toBe('ativo');
      expect(partialFiltros.clienteId).toBeUndefined();
    });
  });

  describe('EstatisticasContrato', () => {
    it('should have correct structure', () => {
      const estatisticas: EstatisticasContrato = {
        contratoId: 'contrato-123',
        nomeContrato: 'Meu Empréstimo',
        valorOriginal: 10000,
        saldoDevedor: 7500,
        valorTotalPago: 2500,
        valorTotalPendente: 7500,
        parcelasPagas: 3,
        parcelasPendentes: 9,
        parcelasVencidas: 0,
        percentualConcluido: 25,
        diasAtraso: 0,
        proximoVencimento: '2024-04-01',
        sistemaAmortizacao: 'PRICE'
      };

      expect(estatisticas).toHaveProperty('contratoId');
      expect(estatisticas).toHaveProperty('nomeContrato');
      expect(estatisticas).toHaveProperty('valorOriginal');
      expect(estatisticas).toHaveProperty('saldoDevedor');
      expect(estatisticas).toHaveProperty('valorTotalPago');
      expect(estatisticas).toHaveProperty('valorTotalPendente');
      expect(estatisticas).toHaveProperty('parcelasPagas');
      expect(estatisticas).toHaveProperty('parcelasPendentes');
      expect(estatisticas).toHaveProperty('parcelasVencidas');
      expect(estatisticas).toHaveProperty('percentualConcluido');
      expect(estatisticas).toHaveProperty('diasAtraso');
      expect(estatisticas).toHaveProperty('proximoVencimento');
      expect(estatisticas).toHaveProperty('sistemaAmortizacao');
    });
  });

  describe('ProgressoContrato', () => {
    it('should have correct structure', () => {
      const progresso: ProgressoContrato = {
        contratoId: 'contrato-123',
        parcelaAtual: 3,
        totalParcelas: 12,
        percentualConcluido: 25,
        valorPago: 2500,
        saldoRestante: 7500,
        diasEmAtraso: 0,
        statusPagamento: 'em_dia',
        proximaParcelaVencimento: '2024-04-01',
        proximaParcelaValor: 888.49
      };

      expect(progresso).toHaveProperty('contratoId');
      expect(progresso).toHaveProperty('parcelaAtual');
      expect(progresso).toHaveProperty('totalParcelas');
      expect(progresso).toHaveProperty('percentualConcluido');
      expect(progresso).toHaveProperty('valorPago');
      expect(progresso).toHaveProperty('saldoRestante');
      expect(progresso).toHaveProperty('diasEmAtraso');
      expect(progresso).toHaveProperty('statusPagamento');
      expect(progresso).toHaveProperty('proximaParcelaVencimento');
      expect(progresso).toHaveProperty('proximaParcelaValor');
    });
  });

  describe('ResumoContratos', () => {
    it('should have correct structure', () => {
      const resumo: ResumoContratos = {
        totalContratos: 10,
        contratosAtivos: 8,
        contratosFinalizados: 1,
        contratosCancelados: 1,
        valorTotalContratado: 100000,
        valorTotalPago: 25000,
        saldoTotalDevedor: 75000,
        contratosPRICE: 6,
        contratosSAC: 4,
        mediaPercentualConclusao: 25
      };

      expect(resumo).toHaveProperty('totalContratos');
      expect(resumo).toHaveProperty('contratosAtivos');
      expect(resumo).toHaveProperty('contratosFinalizados');
      expect(resumo).toHaveProperty('contratosCancelados');
      expect(resumo).toHaveProperty('valorTotalContratado');
      expect(resumo).toHaveProperty('valorTotalPago');
      expect(resumo).toHaveProperty('saldoTotalDevedor');
      expect(resumo).toHaveProperty('contratosPRICE');
      expect(resumo).toHaveProperty('contratosSAC');
      expect(resumo).toHaveProperty('mediaPercentualConclusao');
    });
  });

  describe('HistoricoContrato', () => {
    it('should have correct structure', () => {
      const historico: HistoricoContrato = {
        id: 'historico-123',
        contratoId: 'contrato-123',
        dataAlteracao: '2024-01-15',
        tipoAlteracao: 'pagamento',
        valorAnterior: { parcelasPagas: 2 },
        valorNovo: { parcelasPagas: 3 },
        observacao: 'Pagamento da parcela 3',
        usuarioId: 'usuario-123'
      };

      expect(historico).toHaveProperty('id');
      expect(historico).toHaveProperty('contratoId');
      expect(historico).toHaveProperty('dataAlteracao');
      expect(historico).toHaveProperty('tipoAlteracao');
      expect(historico).toHaveProperty('valorAnterior');
      expect(historico).toHaveProperty('valorNovo');
      expect(historico).toHaveProperty('observacao');
      expect(historico).toHaveProperty('usuarioId');
    });
  });

  describe('Enums', () => {
    it('should have correct enum values', () => {
      expect(StatusContrato.ATIVO).toBe('ativo');
      expect(StatusContrato.CANCELADO).toBe('cancelado');
      expect(StatusContrato.FINALIZADO).toBe('finalizado');

      expect(SistemaAmortizacao.PRICE).toBe('PRICE');
      expect(SistemaAmortizacao.SAC).toBe('SAC');

      expect(TipoAlteracaoContrato.CRIACAO).toBe('criacao');
      expect(TipoAlteracaoContrato.PAGAMENTO).toBe('pagamento');
      expect(TipoAlteracaoContrato.CANCELAMENTO).toBe('cancelamento');
      expect(TipoAlteracaoContrato.FINALIZACAO).toBe('finalizacao');
      expect(TipoAlteracaoContrato.OBSERVACAO).toBe('observacao');
    });
  });
});
