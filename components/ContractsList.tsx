import { Contrato, Parcela } from '@/services';
import { formatarMoeda } from '@/utils/formatters';
import React from 'react';
import { Text, View } from 'react-native';

interface ContractsListProps {
  contratos: Contrato[];
  parcelas: Parcela[];
}

export const ContractsList: React.FC<ContractsListProps> = ({ contratos, parcelas }) => {
  return (
    <View className="w-11/12 mx-auto mt-6 mb-8">
      <Text className="text-2xl font-semibold text-gray-800 mb-4">Seus Empréstimos</Text>
      
      {contratos.map((contrato) => {
        const parcelasContrato = parcelas.filter(p => p.contratoId === contrato.id);
        const parcelasPagas = parcelasContrato.filter(p => p.situacao === 'paga').length;
        const percentualContrato = parcelasContrato.length > 0 
          ? (parcelasPagas / parcelasContrato.length) * 100 
          : 0;

        return (
          <View key={contrato.id} className="bg-white rounded-xl p-4 shadow-md mb-3">
            <View className="flex flex-row justify-between items-start">
              <View className="flex-1 w-2/3">
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
              <View className="items-end w-1/3">
                <Text className="text-lg font-bold text-blue-600">
                  {formatarMoeda(contrato.valorContratado)}
                </Text>
                <Text className="text-xs text-gray-500">
                  {parcelasPagas}/{contrato.prazoContratado || parcelasContrato.length} parcelas
                </Text>
              </View>
            </View>
            
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
  );
};
