import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Contrato, contratosService, Parcela, parcelasService, Usuario, usuariosService } from "@/services";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

interface EstatisticasContratos {
  totalContratos: number;
  saldoTotalDevedor: number;
  totalPago: number;
  totalPendente: number;
  percentualPago: number;
}

export default function Index() {
  // States
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [parcelas, setParcelas] = useState<Parcela[]>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasContratos | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar usuário
        const usuarioEncontrado = await usuariosService.buscarPorId(1);
        setUsuario(usuarioEncontrado);

        // Buscar contratos do cliente
        const contratosEncontrados = await contratosService.filtrarPorCliente('1');
        setContratos(contratosEncontrados);

        // Buscar todas as parcelas dos contratos do cliente
        const todasParcelas: Parcela[] = [];
        for (const contrato of contratosEncontrados) {
          const parcelasContrato = await parcelasService.buscarPorContrato(contrato.id);
          todasParcelas.push(...parcelasContrato);
        }
        setParcelas(todasParcelas);

        // Calcular estatísticas
        const stats = calcularEstatisticas(contratosEncontrados, todasParcelas);
        setEstatisticas(stats);

      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados da aplicação');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const calcularEstatisticas = (contratos: Contrato[], parcelas: Parcela[]): EstatisticasContratos => {
    const parcelasPagas = parcelas.filter(p => p.situacao === 'paga');
    const parcelasPendentes = parcelas.filter(p => p.situacao === 'pendente');
    
    const totalPago = parcelasPagas.reduce((sum, p) => sum + (p.valorPago || 0), 0);
    const totalPendente = parcelasPendentes.reduce((sum, p) => sum + p.valorParcela, 0);
    
    // Saldo devedor é a soma dos saldos devedores das últimas parcelas de cada contrato
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

  const formatarValor = (valor: number): string => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Dados para o gráfico de pizza
  const dadosGrafico = estatisticas ? [
    {
      name: "Pago",
      population: estatisticas.totalPago,
      color: "#22c55e",
      legendFontColor: "#333",
      legendFontSize: 12
    },
    {
      name: "Pendente",
      population: estatisticas.totalPendente,
      color: "#f59e0b",
      legendFontColor: "#333",
      legendFontSize: 12
    },
    {
      name: "Saldo Devedor",
      population: estatisticas.saldoTotalDevedor,
      color: "#ef4444",
      legendFontColor: "#333",
      legendFontSize: 12
    }
  ] : [];

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  if (loading) {
    return (
      <View className="h-full w-full flex items-center justify-center bg-neutral-200">
        <ActivityIndicator size="large" color="#005CA9" />
        <Text className="text-lg text-gray-600 mt-4">Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="h-full w-full flex items-center justify-center bg-neutral-200">
        <Text className="text-lg text-red-600">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="h-full w-full bg-neutral-200">
      {/* Welcome user */}
      <View className="w-full h-60 bg-[#005CA9] rounded-b-2xl">
        <View className="flex flex-row gap-4 items-center justify-center m-8 mt-16">
          <Avatar size="xl">
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
          </Avatar>
          <View>
            <Text className="text-4xl font-semibold text-white">
              Olá, {usuario?.nome?.split(' ')[0] || 'Usuário'}!
            </Text>
            <Text className="text-lg text-blue-100 mt-1">
              {usuario?.profissao || 'Profissional'}
            </Text>
          </View>
        </View>
      </View>

      {/* Saldo devedor */}
      <View className="w-11/12 h-60 mx-auto rounded-2xl bg-white flex flex-row -mt-10 p-6 shadow-lg">
        <View className="w-2/3 flex flex-col h-full justify-center">
          <Text className="text-xl font-semibold text-gray-700">Saldo Devedor</Text>
          <Text className="text-3xl font-semibold text-red-600">
            {formatarValor(estatisticas?.saldoTotalDevedor || 0)}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            {estatisticas?.totalContratos || 0} contrato(s) ativo(s)
          </Text>
        </View>
        <View className="w-1/3 flex-col h-full justify-center items-center">
          {dadosGrafico.length > 0 && (
            <PieChart
              data={dadosGrafico}
              width={150}
              height={120}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute={false}
              hasLegend={false}
            />
          )}
        </View>
      </View>

      {/* Cards de estatísticas */}
      <View className="w-11/12 mx-auto mt-6 flex flex-row justify-between">
        <View className="w-[48%] bg-white rounded-xl p-4 shadow-md">
          <Text className="text-sm font-medium text-gray-600">Total Pago</Text>
          <Text className="text-xl font-bold text-green-600">
            {formatarValor(estatisticas?.totalPago || 0)}
          </Text>
          <Text className="text-xs text-gray-400 mt-1">
            {Math.round(estatisticas?.percentualPago || 0)}% concluído
          </Text>
        </View>
        
        <View className="w-[48%] bg-white rounded-xl p-4 shadow-md">
          <Text className="text-sm font-medium text-gray-600">Pendente</Text>
          <Text className="text-xl font-bold text-orange-600">
            {formatarValor(estatisticas?.totalPendente || 0)}
          </Text>
          <Text className="text-xs text-gray-400 mt-1">
            {parcelas.filter(p => p.situacao === 'pendente').length} parcela(s)
          </Text>
        </View>
      </View>

      {/* Lista de contratos */}
      <View className="w-11/12 mx-auto mt-6 mb-8">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Seus Empréstimos</Text>
        
        {contratos.map((contrato) => {
          const parcelasContrato = parcelas.filter(p => p.contratoId === contrato.id);
          const parcelasPagas = parcelasContrato.filter(p => p.situacao === 'paga').length;
          const percentualContrato = parcelasContrato.length > 0 
            ? (parcelasPagas / parcelasContrato.length) * 100 
            : 0;

          return (
            <View key={contrato.id} className="bg-white rounded-xl p-4 shadow-md mb-3">
              <View className="flex flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">
                    {contrato.nomePersonalizado || contrato.produto?.nome}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    Contrato: {contrato.numeroContrato}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Sistema: {contrato.sistemaAmortizacao || 'PRICE'}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-lg font-bold text-blue-600">
                    {formatarValor(contrato.valorContratado)}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {parcelasPagas}/{contrato.prazoContratado || parcelasContrato.length} parcelas
                  </Text>
                </View>
              </View>
              
              {/* Barra de progresso */}
              <View className="mt-3">
                <View className="w-full bg-gray-200 rounded-full h-2">
                  <View 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${percentualContrato}%` }}
                  />
                </View>
                <Text className="text-xs text-gray-500 mt-1">
                  {Math.round(percentualContrato)}% pago
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Legenda do gráfico */}
      <View className="w-11/12 mx-auto mb-8">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Distribuição Financeira</Text>
        <View className="bg-white rounded-xl p-4 shadow-md">
          {dadosGrafico.map((item, index) => (
            <View key={index} className="flex flex-row items-center justify-between py-2">
              <View className="flex flex-row items-center">
                <View 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="text-sm font-medium text-gray-700">{item.name}</Text>
              </View>
              <Text className="text-sm font-semibold text-gray-800">
                {formatarValor(item.population)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}