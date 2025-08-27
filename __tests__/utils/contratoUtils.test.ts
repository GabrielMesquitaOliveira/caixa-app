import { Contrato, SistemaAmortizacao } from '@/types/contrato';
import { Produto } from '@/types/produto';
import {
  calcularPercentualConclusao,
  formatarInfoContrato,
  isContratoAtivo,
  isContratoPRICE,
  isContratoSAC,
  podeSerCancelado,
  validarDadosContrato,
} from '@/utils/contratoUtils';

describe('contratoUtils', () => {
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

  const contratoMock: Contrato = {
    id: '123',
    produtoId: 1,
    produto: {
      id: '1',
      nome: 'Empréstimo Pessoal',
      taxaJurosAnual: 12,
    },
    clienteId: '456',
    valorContratado: 10000,
    prazoContratado: 12,
    taxaJurosMensal: 1,
    sistemaAmortizacao: SistemaAmortizacao.PRICE,
    valorParcelaMensal: 888.49,
    totalParcelas: 12,
    parcelasPagas: 6,
    status: 'ativo',
    dataContratacao: '2023-01-01',
    dataVencimentoPrimeiraParcela: '2023-02-01',
    nomePersonalizado: 'Meu Empréstimo',
    observacoes: 'Observações do contrato',
    numeroContrato: 'CONTR123',
  };

  describe('isContratoAtivo', () => {
    it('should return true for active contracts', () => {
      expect(isContratoAtivo(contratoMock)).toBe(true);
    });

    it('should return false for inactive contracts', () => {
      const contratoInativo = { ...contratoMock, status: 'cancelado' as const };
      expect(isContratoAtivo(contratoInativo)).toBe(false);
    });
  });

  describe('isContratoSAC', () => {
    it('should return true for SAC contracts', () => {
      const contratoSAC = { ...contratoMock, sistemaAmortizacao: SistemaAmortizacao.SAC };
      expect(isContratoSAC(contratoSAC)).toBe(true);
    });

    it('should return false for non-SAC contracts', () => {
      expect(isContratoSAC(contratoMock)).toBe(false);
    });
  });

  describe('isContratoPRICE', () => {
    it('should return true for PRICE contracts', () => {
      expect(isContratoPRICE(contratoMock)).toBe(true);
    });

    it('should return false for non-PRICE contracts', () => {
      const contratoSAC = { ...contratoMock, sistemaAmortizacao: SistemaAmortizacao.SAC };
      expect(isContratoPRICE(contratoSAC)).toBe(false);
    });
  });

  describe('calcularPercentualConclusao', () => {
    it('should calculate completion percentage correctly', () => {
      expect(calcularPercentualConclusao(contratoMock)).toBe(50); // 6/12 = 50%
    });

    it('should handle zero total parcels', () => {
      const contratoSemParcelas = { ...contratoMock, totalParcelas: 0, parcelasPagas: 0 };
      expect(calcularPercentualConclusao(contratoSemParcelas)).toBe(0);
    });

    it('should handle completed contract', () => {
      const contratoCompleto = { ...contratoMock, parcelasPagas: 12, totalParcelas: 12 };
      expect(calcularPercentualConclusao(contratoCompleto)).toBe(100);
    });

    it('should round percentage to integer', () => {
      const contratoParcial = { ...contratoMock, parcelasPagas: 1, totalParcelas: 3 };
      expect(calcularPercentualConclusao(contratoParcial)).toBe(33); // 33.33% arredondado
    });
  });

  describe('formatarInfoContrato', () => {
    it('should format contract information correctly', () => {
      const info = formatarInfoContrato(contratoMock);
      
      expect(info).toEqual({
        titulo: 'Meu Empréstimo',
        progresso: '6/12',
        percentual: 50,
        sistema: SistemaAmortizacao.PRICE,
        valorFormatado: expect.stringContaining('10.000'),
        parcelaFormatada: expect.stringContaining('888,49'),
      });
    });

    it('should use product name when no custom name', () => {
      const contratoSemNome = { ...contratoMock, nomePersonalizado: '' };
      const info = formatarInfoContrato(contratoSemNome);
      
      expect(info.titulo).toBe('Empréstimo Pessoal');
    });
  });

  describe('podeSerCancelado', () => {
    it('should return true for active contracts with remaining parcels', () => {
      expect(podeSerCancelado(contratoMock)).toBe(true);
    });

    it('should return false for completed contracts', () => {
      const contratoCompleto = { ...contratoMock, parcelasPagas: 12, totalParcelas: 12 };
      expect(podeSerCancelado(contratoCompleto)).toBe(false);
    });

    it('should return false for inactive contracts', () => {
      const contratoInativo = { ...contratoMock, status: 'cancelado' as const };
      expect(podeSerCancelado(contratoInativo)).toBe(false);
    });
  });

  describe('validarDadosContrato', () => {
    it('should return empty array for valid data', () => {
      const dadosValidos = {
        valorContratado: 10000,
        prazoContratado: 12,
        taxaJurosMensal: 1,
        parcelasPagas: 0,
        totalParcelas: 12,
      };
      
      expect(validarDadosContrato(dadosValidos)).toEqual([]);
    });

    it('should detect invalid value', () => {
      const dadosInvalidos = { valorContratado: 0 };
      expect(validarDadosContrato(dadosInvalidos)).toContain('Valor contratado deve ser maior que zero');
    });

    it('should detect invalid term', () => {
      const dadosInvalidos = { prazoContratado: -1 };
      expect(validarDadosContrato(dadosInvalidos)).toContain('Prazo contratado deve ser maior que zero');
    });

    it('should detect negative interest rate', () => {
      const dadosInvalidos = { taxaJurosMensal: -1 };
      expect(validarDadosContrato(dadosInvalidos)).toContain('Taxa de juros não pode ser negativa');
    });

    it('should detect invalid parcel count', () => {
      const dadosInvalidos = { parcelasPagas: 13, totalParcelas: 12 };
      expect(validarDadosContrato(dadosInvalidos)).toContain('Parcelas pagas não pode ser maior que total de parcelas');
    });

    it('should detect multiple errors', () => {
      const dadosInvalidos = {
        valorContratado: 0,
        prazoContratado: -1,
        taxaJurosMensal: -1,
      };
      
      const erros = validarDadosContrato(dadosInvalidos);
      expect(erros).toHaveLength(3);
      expect(erros).toContain('Valor contratado deve ser maior que zero');
      expect(erros).toContain('Prazo contratado deve ser maior que zero');
      expect(erros).toContain('Taxa de juros não pode ser negativa');
    });
  });
});
