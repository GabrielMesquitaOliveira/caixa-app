import { calcularIdadeContrato, formatarMoeda, formatarPorcentagem } from '@/utils/formatters';

describe('formatters', () => {
  describe('formatarMoeda', () => {
    it('should format positive values correctly', () => {
      expect(formatarMoeda(1000)).toBe('R$ 1.000,00');
      expect(formatarMoeda(1234.56)).toBe('R$ 1.234,56');
      expect(formatarMoeda(0.99)).toBe('R$ 0,99');
    });

    it('should format negative values correctly', () => {
      expect(formatarMoeda(-1000)).toBe('-R$ 1.000,00');
      expect(formatarMoeda(-1234.56)).toBe('-R$ 1.234,56');
    });

    it('should format zero correctly', () => {
      expect(formatarMoeda(0)).toBe('R$ 0,00');
    });

    it('should handle large numbers', () => {
      expect(formatarMoeda(1000000)).toBe('R$ 1.000.000,00');
      expect(formatarMoeda(1234567.89)).toBe('R$ 1.234.567,89');
    });
  });

  describe('formatarPorcentagem', () => {
    it('should format percentage with default decimals', () => {
      expect(formatarPorcentagem(12.3456)).toBe('12.35%');
      expect(formatarPorcentagem(0.123)).toBe('0.12%');
      expect(formatarPorcentagem(100)).toBe('100.00%');
    });

    it('should format percentage with custom decimals', () => {
      expect(formatarPorcentagem(12.3456, 0)).toBe('12%');
      expect(formatarPorcentagem(12.3456, 1)).toBe('12.3%');
      expect(formatarPorcentagem(12.3456, 3)).toBe('12.346%');
    });

    it('should handle zero and negative values', () => {
      expect(formatarPorcentagem(0)).toBe('0.00%');
      expect(formatarPorcentagem(-5.5)).toBe('-5.50%');
    });
  });

  describe('calcularIdadeContrato', () => {
    it('should calculate contract age in months correctly', () => {
      const hoje = new Date();
      const umMesAtras = new Date(hoje);
      umMesAtras.setMonth(hoje.getMonth() - 1);
      
      const resultado = calcularIdadeContrato(umMesAtras.toISOString().split('T')[0]);
      expect(resultado).toBe(1);
    });

    it('should handle multiple months', () => {
      const hoje = new Date();
      const seisMesesAtras = new Date(hoje);
      seisMesesAtras.setMonth(hoje.getMonth() - 6);
      
      const resultado = calcularIdadeContrato(seisMesesAtras.toISOString().split('T')[0]);
      expect(resultado).toBe(6);
    });

    it('should handle partial months', () => {
      const hoje = new Date();
      const quinzeDiasAtras = new Date(hoje);
      quinzeDiasAtras.setDate(hoje.getDate() - 15);
      
      const resultado = calcularIdadeContrato(quinzeDiasAtras.toISOString().split('T')[0]);
      expect(resultado).toBe(0); // Menos de 30 dias = 0 meses
    });

    it('should handle future dates', () => {
      const hoje = new Date();
      const umMesNoFuturo = new Date(hoje);
      umMesNoFuturo.setMonth(hoje.getMonth() + 1);
      
      const resultado = calcularIdadeContrato(umMesNoFuturo.toISOString().split('T')[0]);
      expect(resultado).toBe(0); // Datas futuras devem retornar 0
    });

    it('should handle invalid dates', () => {
      expect(calcularIdadeContrato('invalid-date')).toBe(0);
    });
  });
});
