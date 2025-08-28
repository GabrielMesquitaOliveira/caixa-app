import {
    CreateParcelaRequest,
    FiltrosParcelas,
    PagarParcelaRequest,
    Parcela
} from '@/types/parcela';

describe('Parcela Types', () => {
  describe('Parcela', () => {
    it('should have correct structure', () => {
      const parcela: Parcela = {
        id: 'parcela-1',
        contratoId: 'contrato-1',
        numeroParcela: 1,
        dataVencimento: '2024-02-01',
        valorParcela: 888.49,
        valorJuros: 100,
        valorAmortizacao: 788.49,
        saldoDevedor: 7500,
        dataPagamento: null,
        valorPago: null,
        situacao: 'pendente',
        diasAtraso: 0
      };

      expect(parcela).toHaveProperty('id');
      expect(parcela).toHaveProperty('contratoId');
      expect(parcela).toHaveProperty('numeroParcela');
      expect(parcela).toHaveProperty('dataVencimento');
      expect(parcela).toHaveProperty('valorParcela');
      expect(parcela).toHaveProperty('valorJuros');
      expect(parcela).toHaveProperty('valorAmortizacao');
      expect(parcela).toHaveProperty('saldoDevedor');
      expect(parcela).toHaveProperty('situacao');
      expect(parcela).toHaveProperty('diasAtraso');
    });
  });

  describe('CreateParcelaRequest', () => {
    it('should have correct structure', () => {
      const request: CreateParcelaRequest = {
        contratoId: 'contrato-1',
        numeroParcela: 1,
        dataVencimento: '2024-02-01',
        valorParcela: 888.49,
        valorJuros: 100,
        valorAmortizacao: 788.49,
        saldoDevedor: 7500,
        situacao: 'pendente',
        diasAtraso: 0
      };

      expect(request).toHaveProperty('contratoId');
      expect(request).toHaveProperty('numeroParcela');
      expect(request).toHaveProperty('dataVencimento');
      expect(request).toHaveProperty('valorParcela');
      expect(request).toHaveProperty('valorJuros');
      expect(request).toHaveProperty('valorAmortizacao');
      expect(request).toHaveProperty('saldoDevedor');
      expect(request).toHaveProperty('situacao');
      expect(request).toHaveProperty('diasAtraso');
    });
  });

  describe('PagarParcelaRequest', () => {
    it('should have correct structure', () => {
      const request: PagarParcelaRequest = {
        dataPagamento: '2024-02-01',
        valorPago: 888.49,
        situacao: 'paga',
        diasAtraso: 0
      };

      expect(request).toHaveProperty('dataPagamento');
      expect(request).toHaveProperty('valorPago');
      expect(request).toHaveProperty('situacao');
    });
  });

  describe('FiltrosParcelas', () => {
    it('should have correct structure with optional properties', () => {
      const filtros: FiltrosParcelas = {
        contratoId: 'contrato-1',
        situacao: 'pendente',
        numeroParcela: 1,
        dataVencimentoInicio: '2024-01-01',
        dataVencimentoFim: '2024-12-31',
        clienteId: 'cliente-123'
      };

      const partialFiltros: FiltrosParcelas = {
        situacao: 'paga'
      };

      expect(filtros).toHaveProperty('contratoId');
      expect(filtros).toHaveProperty('situacao');
      expect(filtros).toHaveProperty('numeroParcela');
      expect(filtros).toHaveProperty('dataVencimentoInicio');
      expect(filtros).toHaveProperty('dataVencimentoFim');
      expect(filtros).toHaveProperty('clienteId');
      
      expect(partialFiltros.situacao).toBe('paga');
      expect(partialFiltros.contratoId).toBeUndefined();
    });
  });
});
