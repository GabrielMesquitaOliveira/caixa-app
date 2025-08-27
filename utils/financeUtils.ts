import { SimulacaoCalculada, ValidacaoEmprestimo } from '../types/common';
import { Produto } from '../types/produto';
import { ParcelaAmortizacao } from '../types/simulacao';

// Simular empréstimo (cálculo local)
export const simularEmprestimo = (valor: number, prazo: number, taxaAnual: number): SimulacaoCalculada => {
  // Caso especial: taxa zero (sem juros)
  if (taxaAnual === 0) {
    const valorParcela = valor / prazo;
    return {
      valorParcela: parseFloat(valorParcela.toFixed(2)),
      valorTotal: parseFloat(valor.toFixed(2)),
      taxaMensal: 0,
    };
  }
  
  const taxaMensal: number = taxaAnual / 100 / 12;
  const valorParcela: number = (valor * taxaMensal * Math.pow(1 + taxaMensal, prazo)) / 
                      (Math.pow(1 + taxaMensal, prazo) - 1);
  const valorTotal: number = valorParcela * prazo;
  
  return {
    valorParcela: parseFloat(valorParcela.toFixed(2)),
    valorTotal: parseFloat(valorTotal.toFixed(2)),
    taxaMensal: parseFloat((taxaMensal * 100).toFixed(4)),
  };
};

// Gerar tabela de amortização
export const gerarTabelaAmortizacao = (valor: number, prazo: number, taxaAnual: number): ParcelaAmortizacao[] => {
  const taxaMensal: number = taxaAnual / 100 / 12;
  const valorParcela: number = (valor * taxaMensal * Math.pow(1 + taxaMensal, prazo)) / 
                      (Math.pow(1 + taxaMensal, prazo) - 1);
  
  const tabela: ParcelaAmortizacao[] = [];
  let saldoDevedor: number = valor;
  
  for (let mes = 1; mes <= prazo; mes++) {
    const juros: number = saldoDevedor * taxaMensal;
    const amortizacao: number = valorParcela - juros;
    saldoDevedor = saldoDevedor - amortizacao;
    
    tabela.push({
      mes,
      juros: parseFloat(juros.toFixed(2)),
      amortizacao: parseFloat(amortizacao.toFixed(2)),
      saldoDevedor: parseFloat(Math.max(0, saldoDevedor).toFixed(2)),
      valorParcela: parseFloat(valorParcela.toFixed(2)),
    });
  }
  
  return tabela;
};

// Validar dados do empréstimo
export const validarEmprestimo = (valor: number, prazo: number, produto: Produto): ValidacaoEmprestimo => {
  const erros: string[] = [];
  
  if (valor < produto.valorMinimo) {
    erros.push(`Valor mínimo: R$ ${produto.valorMinimo.toLocaleString('pt-BR')}`);
  }
  
  if (valor > produto.valorMaximo) {
    erros.push(`Valor máximo: R$ ${produto.valorMaximo.toLocaleString('pt-BR')}`);
  }
  
  if (prazo < produto.prazoMinimo) {
    erros.push(`Prazo mínimo: ${produto.prazoMinimo} meses`);
  }
  
  if (prazo > produto.prazoMaximo) {
    erros.push(`Prazo máximo: ${produto.prazoMaximo} meses`);
  }
  
  return {
    valido: erros.length === 0,
    erros,
  };
};
