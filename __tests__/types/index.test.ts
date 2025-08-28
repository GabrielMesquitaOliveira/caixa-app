import * as Types from '@/types';

describe('Types Index', () => {
  it('should export types through index barrel', () => {
    // Test that the index barrel exports work
    expect(Types).toBeDefined();
    expect(typeof Types).toBe('object');
  });

  it('should have consistent type definitions', () => {
    // Test that types from different modules are compatible by creating instances
    const contratoResumido: Types.ContratoResumido = {
      id: '1',
      nomePersonalizado: 'Test',
      taxaJurosAnual: 12.5,
      prazoMaximo: 36
    };

    const produtoResumido: Types.ProdutoResumido = {
      id: '1',
      nome: 'Empréstimo Pessoal',
      taxaJurosAnual: 12.5
    };

    expect(contratoResumido.id).toBe('1');
    expect(produtoResumido.nome).toBe('Empréstimo Pessoal');
  });

  it('should allow cross-module type usage', () => {
    // Test that types can be used together
    const contrato: Types.Contrato = {
      id: 'contrato-1',
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

    const parcela: Types.Parcela = {
      id: 'parcela-1',
      contratoId: contrato.id,
      numeroParcela: 1,
      dataVencimento: contrato.dataVencimentoPrimeiraParcela,
      valorParcela: contrato.valorParcelaMensal,
      valorJuros: 100,
      valorAmortizacao: 788.49,
      saldoDevedor: 7500,
      dataPagamento: null,
      valorPago: null,
      situacao: 'pendente',
      diasAtraso: 0
    };

    expect(contrato.id).toBe('contrato-1');
    expect(parcela.contratoId).toBe(contrato.id);
  });
});
