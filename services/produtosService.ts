import { Produto } from '../types/produto';
import api from './api/config';

// Serviços para Produtos
export const produtosService = {
  // Listar todos os produtos
  listar: async (): Promise<Produto[]> => {
    const response = await api.get<Produto[]>('/produtos');
    return response.data;
  },

  // Buscar produto por ID
  buscarPorId: async (id: number): Promise<Produto> => {
    const response = await api.get<Produto>(`/produtos/${id}`);
    return response.data;
  },

  // Filtrar produtos por categoria
  filtrarPorCategoria: async (categoria: Produto['categoria']): Promise<Produto[]> => {
    const response = await api.get<Produto[]>(`/produtos?categoria=${categoria}`);
    return response.data;
  },

  // Criar novo produto
  criar: async (produto: Omit<Produto, 'id'>): Promise<Produto> => {
    const response = await api.post<Produto>('/produtos', produto);
    return response.data;
  },

  // Atualizar produto
  atualizar: async (id: number, produto: Partial<Produto>): Promise<Produto> => {
    const response = await api.put<Produto>(`/produtos/${id}`, produto);
    return response.data;
  },

  // Deletar produto
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/produtos/${id}`);
  },
};
