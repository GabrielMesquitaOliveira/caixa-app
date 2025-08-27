import { useProdutos } from '@/hooks/useProdutos';
import { FormData, Produto } from '@/types';
import { gerarTabelaAmortizacao, simularEmprestimo, validarEmprestimo } from '@/utils/financeUtils';
import React, { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors, UseFormHandleSubmit, useWatch } from 'react-hook-form';
import { ActivityIndicator, Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface StepTwoProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onNextStep: (data: Partial<FormData>) => void;
  onPrevious: () => void;
  onCancel: () => void;
  formData: FormData; // Adicionando a prop formData
}

const StepTwo: React.FC<StepTwoProps> = ({ control, errors, handleSubmit, onNextStep, onPrevious, onCancel, formData }) => {
  const { produtos } = useProdutos();
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [simulacao, setSimulacao] = useState<any>(null);
  const [tabelaAmortizacao, setTabelaAmortizacao] = useState<any[]>([]);
  const [validacao, setValidacao] = useState<any>({ valido: true, erros: [] });

  // Watch form values
  const valorContratado = useWatch({ control, name: 'valorContratado' });
  const prazoContratado = useWatch({ control, name: 'prazoContratado' });

  useEffect(() => {
    console.log('ProdutoId do formData:', formData.produtoId);
    console.log('Produtos disponíveis:', produtos);
    if (formData.produtoId && produtos.length > 0) {
      const produto = produtos.find(p => p.id === formData.produtoId);
      console.log('Produto encontrado:', produto);
      setProdutoSelecionado(produto || null);
    }
  }, [formData.produtoId, produtos]);

  useEffect(() => {
    if (produtoSelecionado && valorContratado && prazoContratado) {
      // Validar empréstimo
      const validacaoResult = validarEmprestimo(
        Number(valorContratado),
        Number(prazoContratado),
        produtoSelecionado
      );
      setValidacao(validacaoResult);

      if (validacaoResult.valido) {
        // Simular empréstimo
        const resultado = simularEmprestimo(
          Number(valorContratado),
          Number(prazoContratado),
          produtoSelecionado.taxaJurosAnual
        );
        setSimulacao(resultado);

        // Gerar tabela de amortização
        const tabela = gerarTabelaAmortizacao(
          Number(valorContratado),
          Number(prazoContratado),
          produtoSelecionado.taxaJurosAnual
        );
        setTabelaAmortizacao(tabela);
      } else {
        setSimulacao(null);
        setTabelaAmortizacao([]);
      }
    } else {
      setSimulacao(null);
      setTabelaAmortizacao([]);
      setValidacao({ valido: true, erros: [] });
    }
  }, [produtoSelecionado, valorContratado, prazoContratado]);

  console.log(produtoSelecionado)
  if (!produtoSelecionado) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Carregando informações do produto...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      <View className="p-4 space-y-6">
        <Text className="text-xl font-bold text-center">Simulação do Empréstimo</Text>
        
        {/* Informações do Produto */}
        <View className="bg-blue-50 p-4 rounded-lg">
          <Text className="font-semibold text-lg">{produtoSelecionado.nome}</Text>
          <Text className="text-gray-600">Taxa: {produtoSelecionado.taxaJurosAnual}% a.a.</Text>
        </View>

        {/* Campos de Valor e Prazo */}
        <View>
          <Text className="text-gray-600 mb-2">Valor do Empréstimo (R$)</Text>
          <Controller
            control={control}
            name="valorContratado"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder={`Ex: ${produtoSelecionado.valorMinimo.toLocaleString()}`}
                keyboardType="numeric"
                value={value?.toString()}
                onChangeText={onChange}
              />
            )}
          />
          {errors.valorContratado && (
            <Text className="text-red-600 mt-1">{errors.valorContratado.message}</Text>
          )}
        </View>

        <View>
          <Text className="text-gray-600 mb-2">Prazo (meses)</Text>
          <Controller
            control={control}
            name="prazoContratado"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder={`Ex: ${produtoSelecionado.prazoMinimo}`}
                keyboardType="numeric"
                value={value?.toString()}
                onChangeText={onChange}
              />
            )}
          />
          {errors.prazoContratado && (
            <Text className="text-red-600 mt-1">{errors.prazoContratado.message}</Text>
          )}
        </View>

        {/* Sistema de Amortização */}
        <View>
          <Text className="text-gray-600 mb-2">Sistema de Amortização</Text>
          <Controller
            control={control}
            name="sistemaAmortizacao"
            render={({ field: { onChange, value } }) => (
              <View className="flex-row space-x-4">
                <TouchableOpacity
                  className={`px-4 py-3 rounded-lg border ${
                    value === 'PRICE' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
                  }`}
                  onPress={() => onChange('PRICE')}
                >
                  <Text>PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-4 py-3 rounded-lg border ${
                    value === 'SAC' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
                  }`}
                  onPress={() => onChange('SAC')}
                >
                  <Text>SAC</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.sistemaAmortizacao && (
            <Text className="text-red-600 mt-1">{errors.sistemaAmortizacao.message}</Text>
          )}
        </View>

        {/* Data de Vencimento */}
        <View>
          <Text className="text-gray-600 mb-2">Data do Primeiro Vencimento</Text>
          <Controller
            control={control}
            name="dataVencimento"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="DD/MM/AAAA"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.dataVencimento && (
            <Text className="text-red-600 mt-1">{errors.dataVencimento.message}</Text>
          )}
        </View>

        {/* Resultado da Simulação */}
        {simulacao && (
          <View className="bg-green-50 p-4 rounded-lg">
            <Text className="font-semibold text-lg text-center mb-3">Resultado da Simulação</Text>
            <View className="space-y-2">
              <Text>Valor da Parcela: <Text className="font-semibold">R$ {simulacao.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text></Text>
              <Text>Valor Total: <Text className="font-semibold">R$ {simulacao.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text></Text>
              <Text>Taxa Mensal: <Text className="font-semibold">{simulacao.taxaMensal}% a.m.</Text></Text>
            </View>
          </View>
        )}

        {/* Tabela de Amortização (primeiras 5 parcelas) */}
        {tabelaAmortizacao.length > 0 && (
          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="font-semibold text-center mb-3">Primeiras Parcelas</Text>
            {tabelaAmortizacao.slice(0, 5).map((parcela) => (
              <View key={parcela.mes} className="flex-row justify-between py-2 border-b border-gray-200">
                <Text>Mês {parcela.mes}</Text>
                <Text className="font-semibold">R$ {parcela.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
              </View>
            ))}
            {tabelaAmortizacao.length > 5 && (
              <Text className="text-center text-gray-600 mt-2">
                + {tabelaAmortizacao.length - 5} parcelas restantes
              </Text>
            )}
          </View>
        )}

        {/* Mensagens de Erro */}
        {!validacao.valido && (
          <View className="bg-red-50 p-4 rounded-lg">
            <Text className="font-semibold text-red-800 mb-2">Atenção:</Text>
            {validacao.erros.map((erro: string, index: number) => (
              <Text key={index} className="text-red-600">• {erro}</Text>
            ))}
          </View>
        )}

        {/* Botões de Navegação */}
        <View className="flex-row justify-between mt-8">
          <Button title="Voltar" onPress={onPrevious} />
          <Button
            title="Próximo"
            onPress={handleSubmit(onNextStep)}
            disabled={!validacao.valido || !valorContratado || !prazoContratado}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default StepTwo;
