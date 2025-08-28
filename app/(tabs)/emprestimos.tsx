import LoanAccordion from '@/components/LoanAccordion';
import { useHomeData } from '@/hooks/useHomeData';
import { formatarMoeda } from '@/utils/formatters';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EmprestimosScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { contratos, loading, error } = useHomeData();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600">Carregando empréstimos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600">Erro ao carregar empréstimos</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="w-11/12 mx-auto mt-6 mb-8">
        <Text className="text-2xl font-semibold text-gray-800 mb-2">
          Meus Empréstimos
        </Text>
        <Text className="text-gray-600 mb-6">
          {contratos.length} empréstimo{contratos.length !== 1 ? 's' : ''} encontrado{contratos.length !== 1 ? 's' : ''}
        </Text>

        {contratos.length === 0 ? (
          <View className="bg-white rounded-xl p-6 shadow-md">
            <Text className="text-center text-gray-600">
              Nenhum empréstimo encontrado.
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{paddingBottom: insets.bottom + 40}}
            data={contratos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View className="bg-white rounded-xl p-4 shadow-md mb-4">
                <View className="flex flex-row justify-between items-start mb-3">
                  <View className="flex-1 w-2/3">
                    <Text className="text-lg font-semibold text-gray-800">
                      {item.nomePersonalizado || item.produto?.nome}
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1">
                      Contrato: {item.numeroContrato}
                    </Text>
                  </View>
                  <View className="items-end w-1/3">
                    <Text className="text-lg font-semibold text-blue-600">
                      {formatarMoeda(item.valorContratado)}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {item.parcelasPagas}/{item.prazoContratado} parcelas
                    </Text>
                  </View>
                </View>

                <LoanAccordion
                  contrato={{
                    valorContratado: item.valorContratado,
                    dataContratacao: item.dataContratacao,
                    sistemaAmortizacao: item.sistemaAmortizacao || 'PRICE',
                    taxaJurosMensal: item.taxaJurosMensal || 0,
                    taxaJurosAnual: item.taxaJurosMensal * 12 || 0, // Calculando taxa anual
                    prazoContratado: item.prazoContratado || 0,
                    parcelasPagas: item.parcelasPagas || 0,
                    saldoDevedor: item.valorContratado - ((item.parcelasPagas || 0) * (item.valorParcelaMensal || 0)),
                    dataUltimoVencimento: item.dataVencimentoPrimeiraParcela,
                    cetMensal: item.taxaJurosMensal || 0,
                    cetAnual: item.taxaJurosMensal * 12 || 0
                  }}
                />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default EmprestimosScreen;
