import { CreateParcelaRequest, FiltrosParcelas, PagarParcelaRequest, Parcela } from "@/types/parcela";
import getApiInstance from "./api/config";

export const parcelasService = {
  // Listar todas as parcelas
  listar: async (): Promise<Parcela[]> => {
    const api = await getApiInstance();
    const response = await api.get<Parcela[]>('/parcelas');
    return response.data;
  },

  // Buscar parcela por ID
  buscarPorId: async (id: string): Promise<Parcela> => {
    const api = await getApiInstance();
    const response = await api.get<Parcela>(`/parcelas/${id}`);
    return response.data;
  },

  // Buscar parcelas por contrato
  buscarPorContrato: async (contratoId: number): Promise<Parcela[]> => {
    const api = await getApiInstance();
    const response = await api.get<Parcela[]>(`/parcelas?contratoId=${contratoId}`);
    return response.data;
  },

  // Buscar parcelas por situação
  buscarPorSituacao: async (situacao: 'paga' | 'pendente' | 'vencida' | 'cancelada'): Promise<Parcela[]> => {
    const api = await getApiInstance();
    const response = await api.get<Parcela[]>(`/parcelas?situacao=${situacao}`);
    return response.data;
  },

  // Buscar parcelas pagas de um contrato
  buscarParclasPagasContrato: async (contratoId: number): Promise<Parcela[]> => {
    const api = await getApiInstance();
    const response = await api.get<Parcela[]>(`/parcelas?contratoId=${contratoId}&situacao=paga`);
    return response.data;
  },

  // Buscar parcelas pendentes de um contrato
  buscarParcelasPendentesContrato: async (contratoId: number): Promise<Parcela[]> => {
    const api = await getApiInstance();
    const response = await api.get<Parcela[]>(`/parcelas?contratoId=${contratoId}&situacao=pendente`);
    return response.data;
  },

  // Buscar próximas parcelas a vencer (próximos 30 dias)
  buscarProximasVencer: async (): Promise<Parcela[]> => {
    const api = await getApiInstance();
    const hoje = new Date();
    const proximoMes = new Date(hoje.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const response = await api.get<Parcela[]>('/parcelas?situacao=pendente');
    
    // Filtrar no lado do cliente (json-server não suporta filtros de data complexos)
    return response.data.filter(parcela => {
      const dataVencimento = new Date(parcela.dataVencimento);
      return dataVencimento >= hoje && dataVencimento <= proximoMes;
    });
  },

  // Buscar parcelas vencidas
  buscarVencidas: async (): Promise<Parcela[]> => {
    const api = await getApiInstance();
    const response = await api.get<Parcela[]>('/parcelas?situacao=pendente');
    const hoje = new Date();
    
    // Filtrar parcelas vencidas e atualizar diasAtraso
    const parcelasVencidas = response.data.filter(parcela => {
      const dataVencimento = new Date(parcela.dataVencimento);
      return dataVencimento < hoje;
    });

    // Calcular dias de atraso
    return parcelasVencidas.map(parcela => ({
      ...parcela,
      diasAtraso: Math.floor((hoje.getTime() - new Date(parcela.dataVencimento).getTime()) / (1000 * 60 * 60 * 24))
    }));
  },

  // Criar nova parcela
  criar: async (parcela: CreateParcelaRequest): Promise<Parcela> => {
    const api = await getApiInstance();
    const response = await api.post<Parcela>('/parcelas', parcela);
    return response.data;
  },

  // Atualizar parcela
  atualizar: async (id: string, parcela: Partial<Parcela>): Promise<Parcela> => {
    const api = await getApiInstance();
    const response = await api.put<Parcela>(`/parcelas/${id}`, parcela);
    return response.data;
  },

  // Pagar parcela (atualizar com dados de pagamento)
  pagar: async (id: string, dadosPagamento: PagarParcelaRequest): Promise<Parcela> => {
    const api = await getApiInstance();
    const response = await api.put<Parcela>(`/parcelas/${id}`, dadosPagamento);
    return response.data;
  },

  // Cancelar parcela
  cancelar: async (id: string): Promise<Parcela> => {
    const api = await getApiInstance();
    const response = await api.put<Parcela>(`/parcelas/${id}`, { 
      situacao: 'cancelada' 
    });
    return response.data;
  },

  // Deletar parcela
  deletar: async (id: string): Promise<void> => {
    const api = await getApiInstance();
    await api.delete(`/parcelas/${id}`);
  },

  // Buscar com filtros múltiplos
  buscarComFiltros: async (filtros: FiltrosParcelas): Promise<Parcela[]> => {
    const api = await getApiInstance();
    const params = new URLSearchParams();
    
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<Parcela[]>(`/parcelas?${params.toString()}`);
    return response.data;
  },

  // Estatísticas de parcelas por contrato
  obterEstatisticasContrato: async (contratoId: number) => {
    const parcelas = await parcelasService.buscarPorContrato(contratoId);
    
    const pagas = parcelas.filter(p => p.situacao === 'paga').length;
    const pendentes = parcelas.filter(p => p.situacao === 'pendente').length;
    const vencidas = parcelas.filter(p => {
      const hoje = new Date();
      const dataVencimento = new Date(p.dataVencimento);
      return p.situacao === 'pendente' && dataVencimento < hoje;
    }).length;
    
    const valorTotalPago = parcelas
      .filter(p => p.situacao === 'paga')
      .reduce((sum, p) => sum + (p.valorPago || 0), 0);
    
    const valorTotalPendente = parcelas
      .filter(p => p.situacao === 'pendente')
      .reduce((sum, p) => sum + p.valorParcela, 0);

    return {
      total: parcelas.length,
      pagas,
      pendentes,
      vencidas,
      canceladas: parcelas.filter(p => p.situacao === 'cancelada').length,
      percentualPago: parcelas.length > 0 ? (pagas / parcelas.length) * 100 : 0,
      valorTotalPago,
      valorTotalPendente,
      saldoAtual: parcelas.length > 0 ? parcelas[parcelas.length - 1].saldoDevedor : 0
    };
  },

  // Gerar parcelas para um contrato (útil para criar todas as parcelas de uma vez)
  gerarParcelas: async (contratoId: number, valorContrato: number, numParcelas: number, taxaJuros: number, sistemaAmortizacao: 'PRICE' | 'SAC'): Promise<Parcela[]> => {
    const parcelas: CreateParcelaRequest[] = [];
    let saldoDevedor = valorContrato;
    const taxaMensal = taxaJuros / 100;

    for (let i = 1; i <= numParcelas; i++) {
      let valorJuros: number;
      let valorAmortizacao: number;
      let valorParcela: number;

      if (sistemaAmortizacao === 'SAC') {
        // Sistema SAC - Amortização constante
        valorAmortizacao = valorContrato / numParcelas;
        valorJuros = saldoDevedor * taxaMensal;
        valorParcela = valorAmortizacao + valorJuros;
      } else {
        // Sistema PRICE - Parcelas constantes
        valorParcela = (valorContrato * taxaMensal * Math.pow(1 + taxaMensal, numParcelas)) / 
                      (Math.pow(1 + taxaMensal, numParcelas) - 1);
        valorJuros = saldoDevedor * taxaMensal;
        valorAmortizacao = valorParcela - valorJuros;
      }

      saldoDevedor -= valorAmortizacao;

      // Data de vencimento (assumindo primeira parcela para próximo mês)
      const dataVencimento = new Date();
      dataVencimento.setMonth(dataVencimento.getMonth() + i);

      parcelas.push({
        contratoId,
        numeroParcela: i,
        dataVencimento: dataVencimento.toISOString(),
        valorParcela: Math.round(valorParcela * 100) / 100,
        valorJuros: Math.round(valorJuros * 100) / 100,
        valorAmortizacao: Math.round(valorAmortizacao * 100) / 100,
        saldoDevedor: Math.round(saldoDevedor * 100) / 100,
        situacao: 'pendente',
        diasAtraso: 0
      });
    }

    // Criar todas as parcelas
    const parcelasCriadas: Parcela[] = [];
    for (const parcela of parcelas) {
      const parcelaCriada = await parcelasService.criar(parcela);
      parcelasCriadas.push(parcelaCriada);
    }

    return parcelasCriadas;
  }
};

export default parcelasService;