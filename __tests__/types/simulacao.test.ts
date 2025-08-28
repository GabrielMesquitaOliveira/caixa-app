import { ContratoResumido } from '@/types/contrato';
import { ParcelaAmortizacao, Simulacao } from '@/types/simulacao';

describe('Simulacao Types', () => {
  describe('ParcelaAmortizacao', () => {
    it('should have correct structure', () => {
      const parcela: ParcelaAmortizacao = {
        mes: 1,
        juros: 100,
        amortizacao: 788.49,
        saldoDevedor: 9211.51,
        valorParcela: 888.49
      };

      expect(parcela).toHaveProperty('mes');
      expect(parcela).toHaveProperty('juros');
      expect(parcela).toHaveProperty('amortizacao');
      expect(parcela).toHaveProperty('saldoDevedor');
      expect(parcela).toHaveProperty('valorParcela');
    });

    it('should validate financial consistency', () => {
      const parcela: ParcelaAmortizacao = {
        mes: 1,
        juros: 100,
        amortizacao: 788.49,
        saldoDevedor: 9211.51,
        valorParcela: 888.49
      };

      // Verifica se o valor da parcela é igual à soma de juros + amortização
      expect(parcela.valorParcela).toBeCloseTo(parcela.juros + parcela.amortizacao, 2);
      
      // Verifica se os valores são positivos
      expect(parcela.juros).toBeGreaterThanOrEqual(0);
      expect(parcela.amortizacao).toBeGreaterThanOrEqual(0);
      expect(parcela.valorParcela).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Simulacao', () => {
    it('should have correct structure', () => {
      const contratoResumido: ContratoResumido = {
        id: 'contrato-1',
        nomePersonalizado: 'Meu Empréstimo',
        taxaJurosAnual: 12.5,
        prazoMaximo: 36
      };

      const memoriaCalculo: ParcelaAmortizacao[] = [
        {
          mes: 1,
          juros: 100,
          amortizacao: 788.49,
          saldoDevedor: 9211.51,
          valorParcela: 888.49
        },
        {
          mes: 2,
          juros: 92.12,
          amortizacao: 796.37,
          saldoDevedor: 8415.14,
          valorParcela: 888.49
        }
      ];

      const simulacao: Simulacao = {
        id: 'simulacao-1',
        contratadoId: 'contrato-1',
        contrato: contratoResumido,
        valorSimulado: 10000,
        prazoSimulado: 12,
        taxaJurosMensal: 1.0,
        valorParcelaMensal: 888.49,
        valorTotalComJuros: 10661.88,
        sistemaAmortizacao: 'PRICE',
        memoriaCalculo: memoriaCalculo,
        criado极Em: '2024-01-01',
        clienteId: 'cliente-123'
      };

      expect(simulacao).toHaveProperty('id');
      expect(simulacao).toHaveProperty('contratadoId');
      expect(simulacao).toHaveProperty('contrato');
      expect(simulacao).toHaveProperty('valorSimulado');
      expect(simulacao).toHaveProperty('prazoSimulado');
      expect(simulacao).toHaveProperty('taxaJurosMensal');
      expect(simulacao).toHaveProperty('valorParcelaMensal');
      expect(simulacao).toHaveProperty('valorTotalComJuros');
      expect(simulacao).toHaveProperty('sistemaAmortizacao');
      expect(simulacao).toHaveProperty('memoriaCalculo');
      expect(simulacao).toHaveProperty('criado极Em');
      expect(simulacao).toHaveProperty('clienteId');
    });

    it('should allow valid sistemaAmortizacao values', () => {
      const contratoResumido: ContratoResumido = {
        id: '1',
        nomePersonalizado: 'Test',
        taxaJurosAnual: 12.5,
        prazoMaximo: 36
      };

      const simulacaoPrice: Simulacao = {
        id: '1',
        contratadoId: '1',
        contrato: contratoResumido,
        valorSimulado: 10000,
        prazoSimulado: 12,
        taxaJurosMensal: 1.0,
        valorParcelaMensal: 888.49,
        valorTotalComJuros: 10661.88,
        sistemaAmortizacao: 'PRICE',
        memoriaCalculo: [],
        criado极Em: '2024-01-01',
        clienteId: 'test'
      };

      const simulacaoSAC: Simulacao = {
        ...simulacaoPrice,
        sistemaAmortizacao: 'SAC'
      };

      expect(simulacaoPrice.sistemaAmortizacao).toBe('PRICE');
      expect(simulacaoSAC.sistemaAmortizacao).toBe('SAC');
    });

    it('should validate financial consistency', () => {
      const contratoResumido: ContratoResumido = {
        id: '1',
        nomePersonalizado: 'Test',
        taxaJurosAnual: 12.5,
        prazoMaximo: 36
      };

      const simulacao: Simulacao = {
        id: '1',
        contratadoId: '1',
        contrato: contratoResumido,
        valorSimulado: 10000,
        prazoSimulado: 12,
        taxaJurosMensal: 1.0,
        valorParcelaMensal: 888.49,
        valorTotalComJuros: 10661.88,
        sistemaAmortizacao: 'PRICE',
        memoriaCalculo: [],
        criado极Em: '2024-01-01',
        clienteId: 'test'
      };

      // Verifica se o valor total com juros é maior que o valor simulado
      expect(simulacao.valorTotalComJuros).toBeGreaterThan(simulacao.valorSimulado);
      
      // Verifica se os valores são positivos
      expect(simulacao.valorSimulado).toBeGreaterThan(0);
      expect(simulacao.prazoSimulado).toBeGreaterThan(0);
      expect(simulacao.taxaJurosMensal).toBeGreaterThan(0);
      expect(simulacao.valorParcelaMensal).toBeGreaterThan(0);
      expect(simulacao.valorTotalComJuros).toBeGreaterThan(0);
    });
  });
});
