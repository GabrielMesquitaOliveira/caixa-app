import { ParcelaComContrato } from '@/hooks/useHomeData';
import { formatarMoeda } from '@/utils/formatters';
import React from 'react';
import { Text, View } from 'react-native';

interface ParcelasVencendoEsteMesProps {
  parcelas: ParcelaComContrato[];
}

const ParcelasVencendoEsteMes: React.FC<ParcelasVencendoEsteMesProps> = ({ parcelas }) => {
  const getStatusColor = (parcela: ParcelaComContrato) => {
    const hoje = new Date();
    const dataVencimento = new Date(parcela.dataVencimento);
    
    if (dataVencimento < hoje) {
      return 'text-red-600'; // Vencida
    } else if (dataVencimento.getDate() <= hoje.getDate() + 7) {
      return 'text-orange-600'; // Próxima semana
    } else {
      return 'text-green-600'; // Este mês
    }
  };

  const getStatusText = (parcela: ParcelaComContrato) => {
    const hoje = new Date();
    const dataVencimento = new Date(parcela.dataVencimento);
    const diasRestantes = Math.ceil((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diasRestantes < 0) {
      return `Vencida há ${Math.abs(diasRestantes)} dias`;
    } else if (diasRestantes === 0) {
      return 'Vence hoje';
    } else if (diasRestantes === 1) {
      return 'Vence amanhã';
    } else {
      return `Vence em ${diasRestantes} dias`;
    }
  };

  if (parcelas.length === 0) {
    return (
      <View className="w-11/12 mx-auto mt-6 mb-8">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Parcelas Vencendo Este Mês</Text>
        <View className="bg-white rounded-xl p-6 shadow-md">
          <Text className="text-center text-gray-600">
            Nenhuma parcela vencendo este mês.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="w-11/12 mx-auto mt-6 mb-8">
      <Text className="text-xl font-semibold text-gray-800 mb-4">Parcelas Vencendo Este Mês</Text>
      <Text className="text-gray-600 mb-6">
        {parcelas.length} parcela{parcelas.length !== 1 ? 's' : ''} encontrada{parcelas.length !== 1 ? 's' : ''}
      </Text>

      {parcelas.map((item) => (
        <View key={item.id} className="bg-white rounded-xl p-4 shadow-md mb-3">
          <View className="flex flex-row justify-between items-start mb-2">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">
                {item.contratoNome || `Contrato ${item.contratoId}`}
              </Text>
              <Text className="text-sm text-gray-600">
                Parcela {item.numeroParcela} • {item.contratoNumero}
              </Text>
            </View>
            <Text className={`text-lg font-bold ${getStatusColor(item)}`}>
              {formatarMoeda(item.valorParcela)}
            </Text>
          </View>

          <View className="flex flex-row justify-between items-center mt-2">
            <Text className="text-sm text-gray-600">
              {new Date(item.dataVencimento).toLocaleDateString('pt-BR')}
            </Text>
            <Text className={`text-sm font-medium ${getStatusColor(item)}`}>
              {getStatusText(item)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ParcelasVencendoEsteMes;
