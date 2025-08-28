import {
    CreateContratoRequest,
    CreateSimulacaoRequest,
    CreateUsuarioRequest,
    ErroApi,
    FormData,
    SimulacaoCalculada,
    ValidacaoEmprestimo
} from '@/types/common';

describe('Common Types', () => {
  describe('CreateContratoRequest', () => {
    it('should have correct structure', () => {
      const request: CreateContratoRequest = {
        produtoId: '1',
        produto: {
          id: '1',
          nome: 'Empréstimo Pessoal',
          taxaJurosAnual: 12.5
        },
        nomePersonalizado: 'Meu Empréstimo',
        valorContratado: 10000,
        prazoContratado: 12,
        dataContratacao: '2024-01-01',
        numeroContrato: 'CONTR001',
        status: 'ativo',
        observacoes: 'Contrato de teste',
        clienteId: 'cliente-123'
      };

      expect(request).toHaveProperty('produtoId');
      expect(request).toHaveProperty('produto');
      expect(request).toHaveProperty('nomePersonalizado');
      expect(request).toHaveProperty('valorContratado');
      expect(request).toHaveProperty('prazoContratado');
      expect(request).toHaveProperty('dataContratacao');
      expect(request).toHaveProperty('numeroContrato');
      expect(request).toHaveProperty('status');
      expect(request).toHaveProperty('observacoes');
      expect(request).toHaveProperty('clienteId');
    });

    it('should allow valid status values', () => {
      const active: CreateContratoRequest = {
        produtoId: '1',
        produto: { id: '1', nome: 'Test', taxaJurosAnual: 10 },
        nomePersonalizado: 'Test',
        valorContratado: 1000,
        prazoContratado: 6,
        dataContratacao: '2024-01-01',
        numeroContrato: 'TEST',
        status: 'ativo',
        observacoes: '',
        clienteId: 'test'
      };

      const canceled: CreateContratoRequest = {
        ...active,
        status: 'cancelado'
      };

      const finished: CreateContratoRequest = {
        ...active,
        status: 'finalizado'
      };

      expect(active.status).toBe('ativo');
      expect(canceled.status).toBe('cancelado');
      expect(finished.status).toBe('finalizado');
    });
  });

  describe('CreateSimulacaoRequest', () => {
    it('should have correct structure', () => {
      const request: CreateSimulacaoRequest = {
        contratadoId: 1,
        contrato: {
          id: '1',
          nomePersonalizado: 'Test',
          taxaJurosAnual: 12.5,
          prazoMaximo: 36
        },
        valorSimulado: 10000,
        prazoSimulado: 12,
        taxaJurosMensal: 1.0,
        valorParcelaMensal: 888.49,
        valorTotalComJuros: 10661.88,
        sistemaAmortizacao: 'PRICE',
        memoriaCalculo: [
          {
            mes: 1,
            juros: 100,
            amortizacao: 788.49,
            saldoDevedor: 9211.51,
            valorParcela: 888.49
          }
        ],
        criadoEm: '2024-01-01',
        clienteId: 'cliente-123'
      };

      expect(request).toHaveProperty('contratadoId');
      expect(request).toHaveProperty('contrato');
      expect(request).toHaveProperty('valorSimulado');
      expect(request).toHaveProperty('prazoSimulado');
      expect(request).toHaveProperty('taxaJurosMensal');
      expect(request).toHaveProperty('valorParcelaMensal');
      expect(request).toHaveProperty('valorTotalComJuros');
      expect(request).toHaveProperty('sistemaAmortizacao');
      expect(request).toHaveProperty('memoriaCalculo');
      expect(request).toHaveProperty('criadoEm');
      expect(request).toHaveProperty('clienteId');
    });
  });

  describe('CreateUsuarioRequest', () => {
    it('should have correct structure', () => {
      const request: CreateUsuarioRequest = {
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 99999-9999',
        profissao: 'Desenvolvedor',
        criadoEm: '2024-01-01'
      };

      expect(request).toHaveProperty('nome');
      expect(request).toHaveProperty('email');
      expect(request).toHaveProperty('telefone');
      expect(request).toHaveProperty('profissao');
      expect(request).toHaveProperty('criadoEm');
    });
  });

  describe('SimulacaoCalculada', () => {
    it('should have correct structure', () => {
      const simulacao: SimulacaoCalculada = {
        valorParcela: 888.49,
        valorTotal: 10661.88,
        taxaMensal: 1.0
      };

      expect(simulacao).toHaveProperty('valorParcela');
      expect(simulacao).toHaveProperty('valorTotal');
      expect(simulacao).toHaveProperty('taxaMensal');
    });
  });

  describe('ValidacaoEmprestimo', () => {
    it('should have correct structure', () => {
      const validacao: ValidacaoEmprestimo = {
        valido: true,
        erros: []
      };

      const invalid: ValidacaoEmprestimo = {
        valido: false,
        erros: ['Valor muito alto', 'Prazo muito curto']
      };

      expect(validacao).toHaveProperty('valido');
      expect(validacao).toHaveProperty('erros');
      expect(invalid.erros).toHaveLength(2);
    });
  });

  describe('ErroApi', () => {
    it('should have correct structure', () => {
      const erro: ErroApi = {
        tipo: 'response',
        status: 404,
        mensagem: 'Recurso não encontrado',
        dados: { id: '123' }
      };

      const networkError: ErroApi = {
        tipo: 'network',
        mensagem: 'Erro de conexão'
      };

      expect(erro).toHaveProperty('tipo');
      expect(erro).toHaveProperty('mensagem');
      expect(erro.status).toBe(404);
      expect(networkError.tipo).toBe('network');
    });
  });

  describe('FormData', () => {
    it('should have correct structure with optional properties', () => {
      const formData: FormData = {
        produtoId: '1',
        valorContratado: 10000,
        prazoContratado: 12,
        sistemaAmortizacao: 'PRICE',
        dataVencimento: '2024-01-01',
        nomePersonalizado: 'Meu Empréstimo',
        observacoes: 'Observações do contrato'
      };

      const partialFormData: FormData = {
        produtoId: '1'
      };

      expect(formData).toHaveProperty('produtoId');
      expect(formData).toHaveProperty('valorContratado');
      expect(formData).toHaveProperty('prazoContratado');
      expect(formData).toHaveProperty('sistemaAmortizacao');
      expect(formData).toHaveProperty('dataVencimento');
      expect(formData).toHaveProperty('nomePersonalizado');
      expect(formData).toHaveProperty('observacoes');
      
      expect(partialFormData.produtoId).toBe('1');
      expect(partialFormData.valorContratado).toBeUndefined();
    });
  });
});
