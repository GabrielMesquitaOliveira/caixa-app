import { Produto, ProdutoResumido } from '@/types/produto';

describe('Produto Types', () => {
  describe('Produto', () => {
    it('should have correct structure', () => {
      const produto: Produto = {
        id: 'produto-1',
        nome: 'Empréstimo Pessoal',
        taxaJurosAnual: 12.5,
        prazoMinimo: 6,
        prazoMaximo: 36,
        valorMinimo: 1000,
        valorMaximo: 50000,
        descricao: 'Empréstimo para pessoa física com taxas competitivas',
        categoria: 'pessoa_fisica'
      };

      expect(produto).toHaveProperty('id');
      expect(produto).toHaveProperty('nome');
      expect(produto).toHaveProperty('taxaJurosAnual');
      expect(produto).toHaveProperty('prazoMinimo');
      expect(produto).toHaveProperty('prazoMaximo');
      expect(produto).toHaveProperty('valorMinimo');
      expect(produto).toHaveProperty('valorMaximo');
      expect(produto).toHaveProperty('descricao');
      expect(produto).toHaveProperty('categoria');
    });

    it('should allow valid categoria values', () => {
      const pessoaFisica: Produto = {
        id: '1',
        nome: 'Test',
        taxaJurosAnual: 10,
        prazoMinimo: 6,
        prazoMaximo: 36,
        valorMinimo: 1000,
        valorMaximo: 50000,
        descricao: 'Test',
        categoria: 'pessoa_fisica'
      };

      const consignado: Produto = {
        ...pessoaFisica,
        categoria: 'consignado'
      };

      const pessoaJuridica: Produto = {
        ...pessoaFisica,
        categoria: 'pessoa_juridica'
      };

      const crediario: Produto = {
        ...pessoaFisica,
        categoria: 'crediario'
      };

      expect(pessoaFisica.categoria).toBe('pessoa_fisica');
      expect(consignado.categoria).toBe('consignado');
      expect(pessoaJuridica.categoria).toBe('pessoa_juridica');
      expect(crediario.categoria).toBe('crediario');
    });

    it('should validate numeric constraints', () => {
      const produto: Produto = {
        id: 'produto-1',
        nome: 'Test',
        taxaJurosAnual: 12.5,
        prazoMinimo: 6,
        prazoMaximo: 36,
        valorMinimo: 1000,
        valorMaximo: 50000,
        descricao: 'Test',
        categoria: 'pessoa_fisica'
      };

      expect(produto.prazoMinimo).toBeLessThanOrEqual(produto.prazoMaximo);
      expect(produto.valorMinimo).toBeLessThanOrEqual(produto.valorMaximo);
      expect(produto.taxaJurosAnual).toBeGreaterThan(0);
    });
  });

  describe('ProdutoResumido', () => {
    it('should have correct structure', () => {
      const resumo: ProdutoResumido = {
        id: 'produto-1',
        nome: 'Empréstimo Pessoal',
        taxaJurosAnual: 12.5
      };

      expect(resumo).toHaveProperty('id');
      expect(resumo).toHaveProperty('nome');
      expect(resumo).toHaveProperty('taxaJurosAnual');
    });

    it('should be compatible with Produto interface', () => {
      const produto: Produto = {
        id: 'produto-1',
        nome: 'Empréstimo Pessoal',
        taxaJurosAnual: 12.5,
        prazoMinimo: 6,
        prazoMaximo: 36,
        valorMinimo: 1000,
        valorMaximo: 50000,
        descricao: 'Test',
        categoria: 'pessoa_fisica'
      };

      const resumo: ProdutoResumido = {
        id: produto.id,
        nome: produto.nome,
        taxaJurosAnual: produto.taxaJurosAnual
      };

      expect(resumo.id).toBe(produto.id);
      expect(resumo.nome).toBe(produto.nome);
      expect(resumo.taxaJurosAnual).toBe(produto.taxaJurosAnual);
    });
  });
});
