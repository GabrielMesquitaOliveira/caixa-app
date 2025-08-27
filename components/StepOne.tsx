import { useProdutos } from '@/hooks/useProdutos';
import { FormData, Produto } from '@/types';
import React, { useState } from 'react';
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { ActivityIndicator, Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface StepOneProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onNextStep: (data: Partial<FormData>) => void;
  onCancel: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ control, errors, handleSubmit, onNextStep, onCancel }) => {
  const { produtos, loading, error } = useProdutos();
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const handleSelecionarProduto = (produto: Produto) => {
    setProdutoSelecionado(produto);
  };

  const handleContinuar = () => {
    if (produtoSelecionado) {
      console.log('Produto selecionado:', produtoSelecionado);
      onNextStep({ produtoId: produtoSelecionado.id });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Carregando modalidades...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-600 text-center mb-4">
          Erro ao carregar modalidades: {error}
        </Text>
        <Button title="Tentar Novamente" onPress={() => window.location.reload()} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text className="text-xl font-bold mb-6 text-center">Escolha sua Modalidade</Text>
      
      <ScrollView className="flex-1">
        <View className="space-y-4 px-4">
          {produtos.map((produto) => (
            <TouchableOpacity
              key={produto.id}
              className={`p-4 border rounded-lg ${
                produtoSelecionado?.id === produto.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white'
              }`}
              onPress={() => handleSelecionarProduto(produto)}
            >
              <Text className="font-semibold text-lg">{produto.nome}</Text>
              <Text className="text-gray-600 mt-1">{produto.descricao}</Text>
              <View className="mt-2">
                <Text className="text-sm text-gray-500">
                  Taxa: {produto.taxaJurosAnual}% a.a.
                </Text>
                <Text className="text-sm text-gray-500">
                  Prazo: {produto.prazoMinimo}-{produto.prazoMaximo} meses
                </Text>
                <Text className="text-sm text-gray-500">
                  Valor: R$ {produto.valorMinimo.toLocaleString()} - R$ {produto.valorMaximo.toLocaleString()}
                </Text>
                <Text className="text-sm text-gray-500 capitalize">
                  Categoria: {produto.categoria.replace('_', ' ')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="p-4 border-t border-gray-200">
        {produtoSelecionado && (
          <View className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Text className="font-semibold text-green-800">
              Modalidade selecionada: {produtoSelecionado.nome}
            </Text>
          </View>
        )}
        
        <View className="flex-row justify-between">
          <Button title="Cancelar" onPress={onCancel} />
          <Button
            title="Continuar"
            onPress={handleContinuar}
            disabled={!produtoSelecionado}
          />
        </View>
      </View>
    </View>
  );
};

export default StepOne;
