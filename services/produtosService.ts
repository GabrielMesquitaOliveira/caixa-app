import { Produto } from '../types/produto';
import { getApiInstance } from './api/config';

// Serviços para Produtos
export const produtosService = {
  // Listar todos os produtos
  listar: async (): Promise<Produto[]> => {
    const api = await getApiInstance();
    const response = await api.get<Produto[]>('/produtos');
    return response.data;
  },

  // Buscar produto por ID
  buscarPorId: async (id: string): Promise<Produto> => {
    const api = await getApiInstance();
    const response = await api.get<Produto>(`/produtos/${id}`);
    return response.data;
  },

  // Filtrar produtos por categoria
  filtrarPorCategoria: async (categoria: Produto['categoria']): Promise<Produto[]> => {
    const api = await getApiInstance();
    const response = await api.get<Produto[]>(`/produtos?categoria=${categoria}`);
    return response.data;
  },

  // Criar novo produto
  criar: async (produto: Omit<Produto, 'id'>): Promise<Produto> => {
    const api = await getApiInstance();
    const response = await api.post<Produto>('/produtos', produto);
    return response.data;
  },

  // Atualizar produto
  atualizar: async (id: string, produto: Partial<Produto>): Promise<Produto> => {
    const api = await getApiInstance();
    const response = await api.put<Produto>(`/produtos/${id}`, produto);
    return response.data;
  },

  // Deletar produto
  deletar: async (id: string): Promise<void> => {
    const api = await getApiInstance();
    await api.delete(`/produtos/${id}`);
  },
};
