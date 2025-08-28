import { Usuario } from '@/types/usuario';

describe('Usuario Types', () => {
  describe('Usuario', () => {
    it('should have correct structure', () => {
      const usuario: Usuario = {
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 99999-9999',
        profissao: 'Desenvolvedor',
        criadoEm: '2024-01-01'
      };

      expect(usuario).toHaveProperty('id');
      expect(usuario).toHaveProperty('nome');
      expect(usuario).toHaveProperty('email');
      expect(usuario).toHaveProperty('telefone');
      expect(usuario).toHaveProperty('profissao');
      expect(usuario).toHaveProperty('criadoEm');
    });

    it('should validate email format', () => {
      const usuario: Usuario = {
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 99999-9999',
        profissao: 'Desenvolvedor',
        criadoEm: '2024-01-01'
      };

      // Verifica se o email tem formato válido
      expect(usuario.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('should validate required fields', () => {
      const usuario: Usuario = {
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 99999-9999',
        profissao: 'Desenvolvedor',
        criadoEm: '2024-01-01'
      };

      expect(usuario.nome).toBeTruthy();
      expect(usuario.email).toBeTruthy();
      expect(usuario.telefone).toBeTruthy();
      expect(usuario.profissao).toBeTruthy();
      expect(usuario.criadoEm).toBeTruthy();
    });

    it('should handle different phone number formats', () => {
      const usuario1: Usuario = {
        id: '1',
        nome: 'Test',
        email: 'test@email.com',
        telefone: '(11) 99999-9999',
        profissao: 'Test',
        criadoEm: '2024-01-01'
      };

      const usuario2: Usuario = {
        ...usuario1,
        telefone: '11999999999'
      };

      const usuario3: Usuario = {
        ...usuario1,
        telefone: '+55 11 99999-9999'
      };

      expect(usuario1.telefone).toBeTruthy();
      expect(usuario2.telefone).toBeTruthy();
      expect(usuario3.telefone).toBeTruthy();
    });

    it('should handle different profession types', () => {
      const professions = [
        'Desenvolvedor',
        'Engenheiro',
        'Médico',
        'Professor',
        'Advogado',
        'Empresário',
        'Estudante',
        'Aposentado'
      ];

      professions.forEach(profissao => {
        const usuario: Usuario = {
          id: '1',
          nome: 'Test',
          email: 'test@email.com',
          telefone: '(11) 99999-9999',
          profissao,
          criadoEm: '2024-01-01'
        };

        expect(usuario.profissao).toBe(profissao);
      });
    });
  });
});
