import { EstatisticasContratos } from '@/hooks/useHomeData';
import { formatarMoeda } from '@/utils/formatters';
import React from 'react';
import { Text, View } from 'react-native';

interface ChartLegendProps {
  estatisticas: EstatisticasContratos;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({ estatisticas }) => {
  const dadosLegenda = [
    { name: "Pago", value: estatisticas.totalPago, color: "#22c55e" },
    { name: "Pendente", value: estatisticas.totalPendente, color: "#f59e0b" },
    { name: "Saldo Devedor", value: estatisticas.saldoTotalDevedor, color: "#ef4444" }
  ];

  return (
    <View className="w-11/12 mx-auto mb-8">
      <Text className="text-2xl font-semibold text-gray-800 mb-3">Distribuição Financeira</Text>
      <View className="bg-white rounded-xl p-4 shadow-md">
        {dadosLegenda.map((item, index) => (
          <View key={index} className="flex flex-row items-center justify-between py-2">
            <View className="flex flex-row items-center">
              <View 
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: item.color }}
              />
              <Text className="text-sm font-medium text-gray-700">{item.name}</Text>
            </View>
            <Text className="text-sm font-semibold text-gray-800">
              {formatarMoeda(item.value)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};