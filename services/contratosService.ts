import { CreateContratoRequest } from '../types/common';
import { Contrato } from '../types/contrato';
import api from './api/config';

// Serviços para Contratos
export const contratosService = {
  // Listar todos os contratos
  listar: async (): Promise<Contrato[]> => {
    const response = await api.get<Contrato[]>('/contratados');
    return response.data;
  },

  // Buscar contrato por ID
  buscarPorId: async (id: number): Promise<Contrato> => {
    const response = await api.get<Contrato>(`/contratados/${id}`);
    return response.data;
  },

  // Filtrar contratos por cliente
  filtrarPorCliente: async (clienteId: string): Promise<Contrato[]> => {
    const response = await api.get<Contrato[]>(`/contratados?clienteId=${clienteId}`);
    return response.data;
  },

  // Filtrar contratos por status
  filtrarPorStatus: async (status: Contrato['status']): Promise<Contrato[]> => {
    const response = await api.get<Contrato[]>(`/contratados?status=${status}`);
    return response.data;
  },

  // Criar novo contrato
  criar: async (contrato: CreateContratoRequest): Promise<Contrato> => {
    const response = await api.post<Contrato>('/contratados', contrato);
    return response.data;
  },

  // Atualizar contrato
  atualizar: async (id: number, contrato: Partial<Contrato>): Promise<Contrato> => {
    const response = await api.put<Contrato>(`/contratados/${id}`, contrato);
    return response.data;
  },

  // Cancelar contrato
  cancelar: async (id: number): Promise<Contrato> => {
    const response = await api.patch<Contrato>(`/contratados/${id}`, { status: 'cancelado' });
    return response.data;
  },

  // Deletar contrato
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/contratados/${id}`);
  },
};
