import { CreateUsuarioRequest } from '../types/common';
import { Usuario } from '../types/usuario';
import api from './api/config';

// Serviços para Usuários
export const usuariosService = {
  // Listar todos os usuários
  listar: async (): Promise<Usuario[]> => {
    const response = await api.get<Usuario[]>('/usuarios');
    return response.data;
  },

  // Buscar usuário por ID
  buscarPorId: async (id: number): Promise<Usuario> => {
    const response = await api.get<Usuario>(`/usuarios/${id}`);
    return response.data;
  },

  // Buscar usuário por email
  buscarPorEmail: async (email: string): Promise<Usuario[]> => {
    const response = await api.get<Usuario[]>(`/usuarios?email=${email}`);
    return response.data;
  },

  // Criar novo usuário
  criar: async (usuario: CreateUsuarioRequest): Promise<Usuario> => {
    const response = await api.post<Usuario>('/usuarios', usuario);
    return response.data;
  },

  // Atualizar usuário
  atualizar: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const response = await api.put<Usuario>(`/usuarios/${id}`, usuario);
    return response.data;
  },

  // Deletar usuário
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  },
};
