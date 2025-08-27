import { CreateSimulacaoRequest } from '../types/common';
import { Simulacao } from '../types/simulacao';
import { getApiInstance } from './api/config';

// Serviços para Simulações
export const simulacoesService = {
  // Listar todas as simulações
  listar: async (): Promise<Simulacao[]> => {
    const api = await getApiInstance();
    const response = await api.get<Simulacao[]>('/simulacoes');
    return response.data;
  },

  // Buscar simulação por ID
  buscarPorId: async (id: string): Promise<Simulacao> => {
    const api = await getApiInstance();
    const response = await api.get<Simulacao>(`/simulacoes/${id}`);
    return response.data;
  },

  // Filtrar simulações por contrato
  filtrarPorContrato: async (contratadoId: number): Promise<Simulacao[]> => {
    const api = await getApiInstance();
    const response = await api.get<Simulacao[]>(`/simulacoes?contratadoId=${contratadoId}`);
    return response.data;
  },

  // Filtrar simulações por cliente
  filtrarPorCliente: async (clienteId: string): Promise<Simulacao[]> => {
    const api = await getApiInstance();
    const response = await api.get<Simulacao[]>(`/simulacoes?clienteId=${clienteId}`);
    return response.data;
  },

  // Criar nova simulação
  criar: async (simulacao: CreateSimulacaoRequest): Promise<Simulacao> => {
    const api = await getApiInstance();
    const response = await api.post<Simulacao>('/simulacoes', simulacao);
    return response.data;
  },

  // Atualizar simulação
  atualizar: async (id: number, simulacao: Partial<Simulacao>): Promise<Simulacao> => {
    const api = await getApiInstance();
    const response = await api.put<Simulacao>(`/simulacoes/${id}`, simulacao);
    return response.data;
  },

  // Deletar simulação
  deletar: async (id: number): Promise<void> => {
    const api = await getApiInstance();
    await api.delete(`/simulacoes/${id}`);
  },
};
