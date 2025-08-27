import { Contrato, contratosService, Parcela, parcelasService, Usuario, usuariosService } from '@/services';
import { useEffect, useState } from 'react';

export interface EstatisticasContratos {
  totalContratos: number;
  saldoTotalDevedor: number;
  totalPago: number;
  totalPendente: number;
  percentualPago: number;
}

export interface ParcelaComContrato extends Parcela {
  contratoNome?: string;
  contratoNumero?: string;
}

export const useHomeData = (userId: number = 1) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [parcelas, setParcelas] = useState<Parcela[]>([]);
  const [parcelasVencendoEsteMes, setParcelasVencendoEsteMes] = useState<ParcelaComContrato[]>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasContratos | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const calcularEstatisticas = (contratos: Contrato[], parcelas: Parcela[]): EstatisticasContratos => {
    const parcelasPagas = parcelas.filter(p => p.situacao === 'paga');
    const parcelasPendentes = parcelas.filter(p => p.situacao === 'pendente');

    const totalPago = parcelasPagas.reduce((sum, p) => sum + (p.valorPago || 0), 0);
    const totalPendente = parcelasPendentes.reduce((sum, p) => sum + p.valorParcela, 0);

    const saldoTotalDevedor = contratos.reduce((total, contrato) => {
      const parcelasContrato = parcelas.filter(p => p.contratoId === contrato.id);
      const ultimaParcela = parcelasContrato
        .sort((a, b) => b.numeroParcela - a.numeroParcela)[0];
      return total + (ultimaParcela?.saldoDevedor || 0);
    }, 0);

    const percentualPago = parcelas.length > 0
      ? (parcelasPagas.length / parcelas.length) * 100
      : 0;

    return {
      totalContratos: contratos.length,
      saldoTotalDevedor,
      totalPago,
      totalPendente,
      percentualPago
    };
  };

  const carregarParcelasVencendoEsteMes = async (contratos: Contrato[]) => {
    try {
      const parcelasVencendo = await parcelasService.buscarVencendoEsteMes();
      
      const parcelasComContrato = await Promise.all(
        parcelasVencendo.map(async (parcela) => {
          try {
            const contrato = await contratosService.buscarPorId(parseInt(parcela.contratoId));
            return {
              ...parcela,
              contratoNome: contrato.nomePersonalizado || contrato.produto?.nome,
              contratoNumero: contrato.numeroContrato
            };
          } catch (err) {
            return parcela;
          }
        })
      );

      setParcelasVencendoEsteMes(parcelasComContrato);
    } catch (err) {
      console.error('Erro ao carregar parcelas vencendo este mês:', err);
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usuarioEncontrado, contratosEncontrados] = await Promise.all([
          usuariosService.buscarPorId(userId),
          contratosService.filtrarPorCliente(userId.toString())
        ]);

        setUsuario(usuarioEncontrado);
        setContratos(contratosEncontrados);

        // Buscar parcelas de todos os contratos
        const todasParcelas = await Promise.all(
          contratosEncontrados.map(contrato =>
            parcelasService.buscarPorContrato(contrato.id)
          )
        );

        const parcelasFlat = todasParcelas.flat();
        setParcelas(parcelasFlat);

        // Carregar parcelas vencendo este mês
        await carregarParcelasVencendoEsteMes(contratosEncontrados);

        const stats = calcularEstatisticas(contratosEncontrados, parcelasFlat);
        setEstatisticas(stats);

      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados da aplicação');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [userId]);

  return { 
    usuario, 
    contratos, 
    parcelas, 
    parcelasVencendoEsteMes,
    estatisticas, 
    loading, 
    error 
  };
};
