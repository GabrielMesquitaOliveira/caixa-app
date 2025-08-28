import MultiStepForm from '@/components/MultiStepForm';
import { contratosService } from '@/services/contratosService';
import { simulacoesService } from '@/services/simulacoesService';
import { FormData } from '@/types';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

export default function Contratar() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      
      // Primeiro criar a simulação (apenas para cálculo)
      const simulacao = await simulacoesService.criar({
        valorSimulado: data.valorContratado!,
        prazoSimulado: data.prazoContratado!,
        sistemaAmortizacao: data.sistemaAmortizacao! as 'PRICE' | 'SAC',
        clienteId: '1',
      } as any); // Usando any temporariamente para evitar erros de tipo

      // Depois criar o contrato
      const contrato = await contratosService.criar({
        produtoId: data.produtoId!,
        valorContratado: data.valorContratado!,
        prazoContratado: data.prazoContratado!,
        nomePersonalizado: data.nomePersonalizado || `Empréstimo ${data.produtoId}`,
        observacoes: data.observacoes || '',
        clienteId: '1',
      } as any); // Usando any temporariamente para evitar erros de tipo

      Alert.alert(
        'Sucesso!',
        `Contrato criado com sucesso!\nNúmero: ${contrato.numeroContrato}`,
        [{ text: 'OK', onPress: () => console.log('Contrato criado') }]
      );
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
      Alert.alert(
        'Erro',
        'Não foi possível criar o contrato. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar',
      'Deseja realmente cancelar a contratação?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => console.log('Contratação cancelada') }
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg text-gray-600">Processando contratação...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-neutral-100">
      <View className="p-4">
        <MultiStepForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </View>
    </ScrollView>
  );
}
