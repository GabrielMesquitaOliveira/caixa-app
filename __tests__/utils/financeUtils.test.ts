import { Produto } from '@/types/produto';
import { gerarTabelaAmortizacao, simularEmprestimo, validarEmprestimo } from '@/utils/financeUtils';

describe('financeUtils', () => {
  describe('simularEmprestimo', () => {
    it('should calculate loan simulation correctly', () => {
      const resultado = simularEmprestimo(10000, 12, 12);
      
      expect(resultado).toEqual({
        valorParcela: expect.any(Number),
        valorTotal: expect.any(Number),
        taxaMensal: expect.any(Number),
      });
      
      expect(resultado.valorParcela).toBeGreaterThan(0);
      expect(resultado.valorTotal).toBeGreaterThan(10000); // Deve incluir juros
      expect(resultado.taxaMensal).toBeCloseTo(1.0, 1); // 12% anual = 1% mensal
    });

    it('should handle zero interest rate', () => {
      const resultado = simularEmprestimo(10000, 12, 0);
      
      expect(resultado.valorParcela).toBeCloseTo(833.33, 2);
      expect(resultado.valorTotal).toBeCloseTo(10000, 2);
      expect(resultado.taxaMensal).toBe(0);
    });

    it('should handle edge cases', () => {
      const resultado = simularEmprestimo(1, 1, 12);
      
      expect(resultado.valorParcela).toBeCloseTo(1.01, 2);
      expect(resultado.valorTotal).toBeCloseTo(1.01, 2);
    });
  });

  describe('gerarTabelaAmortizacao', () => {
    it('should generate amortization table correctly', () => {
      const tabela = gerarTabelaAmortizacao(10000, 12, 12);
      
      expect(tabela).toHaveLength(12);
      
      // Verificar primeira parcela
      expect(tabela[0]).toEqual({
        mes: 1,
        juros: expect.any(Number),
        amortizacao: expect.any(Number),
        saldoDevedor: expect.any(Number),
        valorParcela: expect.any(Number),
      });

      // Verificar última parcela
      expect(tabela[11].saldoDevedor).toBeCloseTo(0, 2);
      
      // Verificar que juros diminuem ao longo do tempo
      expect(tabela[0].juros).toBeGreaterThan(tabela[11].juros);
      
      // Verificar que amortização aumenta ao longo do tempo
      expect(tabela[0].amortizacao).toBeLessThan(tabela[11].amortizacao);
    });

    it('should handle single installment', () => {
      const tabela = gerarTabelaAmortizacao(1000, 1, 12);
      
      expect(tabela).toHaveLength(1);
      expect(tabela[0].saldoDevedor).toBeCloseTo(0, 2);
      expect(tabela[0].valorParcela).toBeCloseTo(1010, 2);
    });
  });

  describe('validarEmprestimo', () => {
    const produtoMock: Produto = {
      id: '1',
      nome: 'Empréstimo Pessoal',
      descricao: 'Empréstimo pessoal com taxas competitivas',
      valorMinimo: 1000,
      valorMaximo: 50000,
      prazoMinimo: 6,
      prazoMaximo: 60,
      taxaJurosAnual: 12,
      categoria: 'pessoa_fisica',
    };

    it('should validate valid loan', () => {
      const resultado = validarEmprestimo(10000, 12, produtoMock);
      
      expect(resultado.valido).toBe(true);
      expect(resultado.erros).toHaveLength(0);
    });

    it('should detect value below minimum', () => {
      const resultado = validarEmprestimo(500, 12, produtoMock);
      
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toContain('Valor mínimo: R$ 1.000');
    });

    it('should detect value above maximum', () => {
      const resultado = validarEmprestimo(60000, 12, produtoMock);
      
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toContain('Valor máximo: R$ 50.000');
    });

    it('should detect term below minimum', () => {
      const resultado = validarEmprestimo(10000, 3, produtoMock);
      
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toContain('Prazo mínimo: 6 meses');
    });

    it('should detect term above maximum', () => {
      const resultado = validarEmprestimo(10000, 72, produtoMock);
      
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toContain('Prazo máximo: 60 meses');
    });

    it('should detect multiple errors', () => {
      const resultado = validarEmprestimo(500, 3, produtoMock);
      
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toHaveLength(2);
      expect(resultado.erros).toContain('Valor mínimo: R$ 1.000');
      expect(resultado.erros).toContain('Prazo mínimo: 6 meses');
    });
  });
});
