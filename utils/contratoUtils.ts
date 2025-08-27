import { Contrato, SistemaAmortizacao, StatusContrato } from '../types/contrato';

// Type guards para validação
export const isContratoAtivo = (contrato: Contrato): boolean => {
    return contrato.status === StatusContrato.ATIVO;
};

export const isContratoSAC = (contrato: Contrato): boolean => {
    return contrato.sistemaAmortizacao === SistemaAmortizacao.SAC;
};

export const isContratoPRICE = (contrato: Contrato): boolean => {
    return contrato.sistemaAmortizacao === SistemaAmortizacao.PRICE;
};

// Função para calcular percentual de conclusão
export const calcularPercentualConclusao = (contrato: Contrato): number => {
    if (contrato.totalParcelas === 0) return 0;
    return Math.round((contrato.parcelasPagas / contrato.totalParcelas) * 100);
};

// Função para verificar se contrato está em atraso
export const isContratoEmAtraso = (contrato: Contrato, parcelas: any[]): boolean => {
    const hoje = new Date();
    return parcelas.some(parcela =>
        parcela.contratoId === contrato.id &&
        parcela.situacao === 'pendente' &&
        new Date(parcela.dataVencimento) < hoje
    );
};

// Função para formatar informações do contrato para UI
export const formatarInfoContrato = (contrato: Contrato) => ({
    titulo: contrato.nomePersonalizado || contrato.produto.nome,
    progresso: `${contrato.parcelasPagas}/${contrato.totalParcelas}`,
    percentual: calcularPercentualConclusao(contrato),
    sistema: contrato.sistemaAmortizacao,
    valorFormatado: contrato.valorContratado.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }),
    parcelaFormatada: contrato.valorParcelaMensal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
});

// Função para calcular saldo devedor restante
export const calcularSaldoDevedor = (contrato: Contrato, ultimaParcela?: any): number => {
    if (ultimaParcela && ultimaParcela.saldoDevedor !== undefined) {
        return ultimaParcela.saldoDevedor;
    }

    // Cálculo aproximado se não tiver parcela
    const parcelasRestantes = contrato.totalParcelas - contrato.parcelasPagas;
    return parcelasRestantes * contrato.valorParcelaMensal;
};

// Função para verificar se contrato pode ser cancelado
export const podeSerCancelado = (contrato: Contrato): boolean => {
    return contrato.status === StatusContrato.ATIVO && contrato.parcelasPagas < contrato.totalParcelas;
};

// Função para obter próxima data de vencimento
export const obterProximoVencimento = (contrato: Contrato): Date | null => {
    if (contrato.parcelasPagas >= contrato.totalParcelas) {
        return null; // Contrato finalizado
    }

    const dataBase = new Date(contrato.dataVencimentoPrimeiraParcela);
    dataBase.setMonth(dataBase.getMonth() + contrato.parcelasPagas);

    return dataBase;
};

// Função para calcular tempo restante do contrato
export const calcularTempoRestante = (contrato: Contrato): {
    mesesRestantes: number;
    dataFinalizacao: Date;
} => {
    const mesesRestantes = contrato.totalParcelas - contrato.parcelasPagas;
    const dataFinalizacao = new Date(contrato.dataVencimentoPrimeiraParcela);
    dataFinalizacao.setMonth(dataFinalizacao.getMonth() + contrato.totalParcelas - 1);

    return {
        mesesRestantes,
        dataFinalizacao
    };
};

// Função para validar dados do contrato
export const validarDadosContrato = (dados: Partial<Contrato>): string[] => {
    const erros: string[] = [];

    if (dados.valorContratado && dados.valorContratado <= 0) {
        erros.push('Valor contratado deve ser maior que zero');
    }

    if (dados.prazoContratado && dados.prazoContratado <= 0) {
        erros.push('Prazo contratado deve ser maior que zero');
    }

    if (dados.taxaJurosMensal && dados.taxaJurosMensal < 0) {
        erros.push('Taxa de juros não pode ser negativa');
    }

    if (dados.parcelasPagas && dados.totalParcelas && dados.parcelasPagas > dados.totalParcelas) {
        erros.push('Parcelas pagas não pode ser maior que total de parcelas');
    }

    return erros;
};

// Função para comparar dois contratos
export const compararContratos = (contratoA: Contrato, contratoB: Contrato) => ({
    diferencaValor: contratoA.valorContratado - contratoB.valorContratado,
    diferencaPrazo: contratoA.prazoContratado - contratoB.prazoContratado,
    diferencaProgresso: calcularPercentualConclusao(contratoA) - calcularPercentualConclusao(contratoB),
    sistemasDiferentes: contratoA.sistemaAmortizacao !== contratoB.sistemaAmortizacao
});

export default {
    isContratoAtivo,
    isContratoSAC,
    isContratoPRICE,
    calcularPercentualConclusao,
    isContratoEmAtraso,
    formatarInfoContrato,
    calcularSaldoDevedor,
    podeSerCancelado,
    obterProximoVencimento,
    calcularTempoRestante,
    validarDadosContrato,
    compararContratos
};