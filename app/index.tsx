import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { produtosService } from '../services';
import { Produto } from '../types';

export default function Index() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const carregarProdutos = async () => {
      setLoading(true);
      try {
        const produtosData = await produtosService.listar();
        setProdutos(produtosData);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, []);

  if (loading) {
    return (
      <View className="h-full w-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="h-full w-full flex items-center justify-center">
      <Text className="text-xl font-bold text-blue-500">Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-lg">{item.nome}</Text>
        )}
      />
    </View>
  );
}
