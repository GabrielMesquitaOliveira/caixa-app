// Formatar valor monetário
export const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Formatar porcentagem
export const formatarPorcentagem = (valor: number, decimais: number = 2): string => {
  return `${valor.toFixed(decimais)}%`;
};

// Calcular idade em meses entre duas datas
export const calcularIdadeContrato = (dataContratacao: string): number => {
  const hoje = new Date();
  const contratacao = new Date(dataContratacao);
  const diffTime = Math.abs(hoje.getTime() - contratacao.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 30);
};
