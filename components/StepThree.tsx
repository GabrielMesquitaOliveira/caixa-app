import { FormData } from '@/types';
import React from 'react';
import { Control, Controller, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';

interface StepThreeProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onNextStep: (data: Partial<FormData>) => void;
  onPrevious: () => void;
  onCancel: () => void;
  formData: FormData;
}

const StepThree: React.FC<StepThreeProps> = ({ control, errors, handleSubmit, onNextStep, onPrevious, onCancel, formData }) => {
  return (
    <View className="gap-4">
      <Text className="text-xl font-bold mb-4">Aceitar Contrato</Text>
      
      {/* Resumo do Contrato */}
      <View className="bg-blue-50 p-4 rounded-lg">
        <Text className="font-semibold text-lg text-center mb-3">Resumo do Contrato</Text>
        <View className="gap-2">
          <Text>Valor do Empréstimo: <Text className="font-semibold">R$ {formData.valorContratado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text></Text>
          <Text>Prazo: <Text className="font-semibold">{formData.prazoContratado} meses</Text></Text>
          <Text>Sistema de Amortização: <Text className="font-semibold">{formData.sistemaAmortizacao}</Text></Text>
          <Text>Data de Vencimento: <Text className="font-semibold">{formData.dataVencimento}</Text></Text>
        </View>
      </View>
      
      <View>
        <Text className="text-gray-600 mb-2">Nome Personalizado</Text>
        <Controller
          control={control}
          name="nomePersonalizado"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Ex: Empréstimo Casa Nova"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.nomePersonalizado && (
          <Text className="text-red-600 mt-1">
            {errors.nomePersonalizado.message}
          </Text>
        )}
      </View>

      <View>
        <Text className="text-gray-600 mb-2">Observações (Opcional)</Text>
        <Controller
          control={control}
          name="observacoes"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg p-3 h-20"
              placeholder="Observações adicionais..."
              multiline
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.observacoes && (
          <Text className="text-red-600 mt-1">
            {errors.observacoes.message}
          </Text>
        )}
      </View>

      <View className="flex-row justify-between mt-8">
        <Button title="Voltar" onPress={onPrevious} />
        <Button
          title="Finalizar"
          onPress={handleSubmit(onNextStep)}
        />
      </View>
    </View>
  );
};

export default StepThree;
