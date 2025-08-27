import { validarCPF, validarEmail, validarTelefone } from '@/utils/validators';

describe('validators', () => {
  describe('validarEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validarEmail('test@example.com')).toBe(true);
      expect(validarEmail('user.name@domain.co.uk')).toBe(true);
      expect(validarEmail('first.last@sub.domain.com')).toBe(true);
      expect(validarEmail('email123@test-domain.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validarEmail('invalid-email')).toBe(false);
      expect(validarEmail('user@')).toBe(false);
      expect(validarEmail('@domain.com')).toBe(false);
      expect(validarEmail('user@domain')).toBe(false);
      expect(validarEmail('user@.com')).toBe(false);
      expect(validarEmail('')).toBe(false);
      expect(validarEmail('   ')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(validarEmail('test+filter@example.com')).toBe(true);
      expect(validarEmail('a@b.c')).toBe(true); // Minimal valid email
    });
  });

  describe('validarTelefone', () => {
    it('should validate correct phone numbers', () => {
      expect(validarTelefone('(11) 99999-9999')).toBe(true);
      expect(validarTelefone('11999999999')).toBe(true);
      expect(validarTelefone('(21) 3333-4444')).toBe(true);
      expect(validarTelefone('2133334444')).toBe(true);
      expect(validarTelefone('+55 11 99999-9999')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validarTelefone('123')).toBe(false);
      expect(validarTelefone('999999999')).toBe(false); // 9 dígitos
      expect(validarTelefone('119999999999')).toBe(false); // 12 dígitos
      expect(validarTelefone('abc')).toBe(false);
      expect(validarTelefone('')).toBe(false);
    });

    it('should handle different formats', () => {
      // Telefone fixo
      expect(validarTelefone('1133334444')).toBe(true);
      expect(validarTelefone('(11) 3333-4444')).toBe(true);
      
      // Celular
      expect(validarTelefone('11999999999')).toBe(true);
      expect(validarTelefone('(11) 99999-9999')).toBe(true);
    });
  });

  describe('validarCPF', () => {
    it('should validate correct CPF numbers', () => {
      expect(validarCPF('111.444.777-35')).toBe(true);
      expect(validarCPF('11144477735')).toBe(true);
      expect(validarCPF('123.456.789-09')).toBe(true);
      expect(validarCPF('12345678909')).toBe(true);
    });

    it('should reject invalid CPF numbers', () => {
      expect(validarCPF('111.111.111-11')).toBe(false); // Todos dígitos iguais
      expect(validarCPF('123.456.789-00')).toBe(false); // Dígitos verificadores inválidos
      expect(validarCPF('123')).toBe(false); // Muito curto
      expect(validarCPF('123456789012')).toBe(false); // Muito longo
      expect(validarCPF('abc.def.ghi-jk')).toBe(false); // Caracteres não numéricos
      expect(validarCPF('')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(validarCPF('000.000.000-00')).toBe(false);
      expect(validarCPF('999.999.999-99')).toBe(false);
    });

    it('should validate specific known valid CPFs', () => {
      // CPFs válidos conhecidos
      expect(validarCPF('529.982.247-25')).toBe(true);
      expect(validarCPF('11144477735')).toBe(true);
      expect(validarCPF('12345678909')).toBe(true);
    });
  });
});
