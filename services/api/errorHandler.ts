import { ErroApi } from '../../types/common';

export const tratarErroApi = (error: any): ErroApi => {
  if (error.response) {
    // Erro de resposta do servidor
    return {
      tipo: 'response',
      status: error.response.status,
      mensagem: error.response.data?.message || 'Erro do servidor',
      dados: error.response.data,
    };
  } else if (error.request) {
    // Erro de rede
    return {
      tipo: 'network',
      mensagem: 'Erro de conexão com o servidor',
    };
  } else {
    // Erro de configuração
    return {
      tipo: 'config',
      mensagem: error.message,
    };
  }
};
