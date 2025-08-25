import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  numeroConta: string;
  onMenuPress: () => void;
  onNotificacoesPress: () => void;
}

export function Header({ 
  numeroConta, 
  onMenuPress, 
  onNotificacoesPress 
}: HeaderProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].headerTabBackground;
  
  return (
    <SafeAreaView edges={['top']} className="bg-[#005CA9]">
      <ThemedView className="flex-row items-center justify-between px-4 py-3 bg-[#005CA9]">
        <TouchableOpacity onPress={onMenuPress} className="p-2">
          <MaterialIcons 
            name="menu" 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
        
        <View className="flex-1 items-center justify-center">
          <ThemedText 
            className="text-white text-base font-semibold"
          >
            {numeroConta}
          </ThemedText>
        </View>
        
        <TouchableOpacity onPress={onNotificacoesPress} className="p-2">
          <MaterialIcons 
            name="notifications" 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
