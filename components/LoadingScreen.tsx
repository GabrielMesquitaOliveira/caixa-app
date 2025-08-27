import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export const LoadingScreen: React.FC = () => (
  <View className="h-full w-full flex items-center justify-center bg-neutral-200">
    <ActivityIndicator size="large" color="#005CA9" />
    <Text className="text-lg text-gray-600 mt-4">Carregando...</Text>
  </View>
);