import { EstatisticasContratos } from '@/hooks/useHomeData';
import { formatarMoeda } from '@/utils/formatters';
import React from 'react';
import { Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface FinancialSummaryCardProps {
  estatisticas: EstatisticasContratos;
}

/**
 * Componente que exibe um resumo financeiro com dados de contratos ativos,
 * saldo devedor total e uma grafico de pizza com a distribui o dos valores
 * pagos, pendentes e saldo devedor.
 * 
 * @example
 * <FinancialSummaryCard estatisticas={estatisticas} />
 * 
 * @param estatisticas - objeto com as estatísticas de contratos ativos
 * @returns JSX.Element
 */
export const FinancialSummaryCard: React.FC<FinancialSummaryCardProps> = ({ estatisticas }) => {
  const dadosGrafico = [
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
  ];

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View className="w-11/12 h-60 mx-auto rounded-2xl bg-white flex flex-row items-center justify-center -mt-20 p-6 shadow-lg">
      <View className="w-2/3 flex flex-col justify-center">
        <Text className="text-xl font-semibold text-gray-700">Saldo Devedor</Text>
        <Text className="text-3xl font-semibold text-red-600">
          {formatarMoeda(estatisticas.saldoTotalDevedor)}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          {estatisticas.totalContratos} contrato(s) ativo(s)
        </Text>
      </View>
      <View className="w-1/3 flex flex-col h-full justify-center items-center">
        {dadosGrafico.length > 0 && (
          <PieChart
            data={dadosGrafico}
            width={120}
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
  );
};
