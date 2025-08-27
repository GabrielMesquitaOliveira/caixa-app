import React from 'react';
import { Text, View } from 'react-native';

interface ErrorScreenProps {
  error: string;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error }) => (
  <View className="h-full w-full flex items-center justify-center bg-neutral-200">
    <Text className="text-lg text-red-600">{error}</Text>
  </View>
);