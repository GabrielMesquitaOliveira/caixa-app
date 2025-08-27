export interface Produto {
  id: string;
  nome: string;
  taxaJurosAnual: number;
  prazoMinimo: number;
  prazoMaximo: number;
  valorMinimo: number;
  valorMaximo: number;
  descricao: string;
  categoria: 'pessoa_fisica' | 'consignado' | 'pessoa_juridica' | 'crediario';
}

export interface ProdutoResumido {
  id: string;
  nome: string;
  taxaJurosAnual: number;
}
