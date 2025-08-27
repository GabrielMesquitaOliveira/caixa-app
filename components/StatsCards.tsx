import { EstatisticasContratos } from '@/hooks/useHomeData';
import { formatarMoeda } from '@/utils/formatters';
import React from 'react';
import { Text, View } from 'react-native';

interface StatsCardsProps {
  estatisticas: EstatisticasContratos;
  totalParcelasPendentes: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ estatisticas, totalParcelasPendentes }) => {
  return (
    <View className="w-11/12 mx-auto mt-6 flex flex-row justify-between">
      <View className="w-[48%] bg-white rounded-xl p-4 shadow-md">
        <Text className="text-sm font-medium text-gray-600">Total Pago</Text>
        <Text className="text-xl font-bold text-green-600">
          {formatarMoeda(estatisticas.totalPago)}
        </Text>
        <Text className="text-xs text-gray-400 mt-1">
          {Math.round(estatisticas.percentualPago)}% concluído
        </Text>
      </View>
      
      <View className="w-[48%] bg-white rounded-xl p-4 shadow-md">
        <Text className="text-sm font-medium text-gray-600">Pendente</Text>
        <Text className="text-xl font-bold text-orange-600">
          {formatarMoeda(estatisticas.totalPendente)}
        </Text>
        <Text className="text-xs text-gray-400 mt-1">
          {totalParcelasPendentes} parcela(s)
        </Text>
      </View>
    </View>
  );
};
