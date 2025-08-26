import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Estendendo o tipo das options para incluir props customizadas
interface CustomHeaderOptions {
  numeroConta?: string;
  onMenuPress?: () => void;
  onNotificacoesPress?: () => void;
  showAccountNumber?: boolean;
}

interface CustomHeaderProps extends NativeStackHeaderProps {
  options: NativeStackHeaderProps['options'] & CustomHeaderOptions;
}

export function Header({ 
  navigation, 
  route, 
  options,
  back,
}: CustomHeaderProps) {
  // Props padrão ou vindas das options da screen
  const numeroConta = (options as any).numeroConta || "Ag. 3737 CC.576939466-4";
  const showAccountNumber = (options as any).showAccountNumber ?? !back;
  const title = options.title || route.name;

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleMenuPress = () => {
    const onMenuPress = (options as any).onMenuPress;
    if (onMenuPress) {
      onMenuPress();
    } else {
      // Comportamento padrão do menu
      console.log('Menu pressed');
    }
  };

  const handleNotificacoesPress = () => {
    const onNotificacoesPress = (options as any).onNotificacoesPress;
    if (onNotificacoesPress) {
      onNotificacoesPress();
    } else {
      // Comportamento padrão das notificações
      console.log('Notificações pressed');
    }
  };

  return (
    <SafeAreaView edges={['top']} className="bg-[#005CA9]">
      <View className="flex-row items-center justify-between px-4 py-3 bg-[#005CA9]">
        {/* Left Side - Menu ou Back Button */}
        <TouchableOpacity 
          onPress={back ? handleBackPress : handleMenuPress} 
          className="p-2"
        >
          <MaterialIcons
            name={back ? "arrow-back" : "menu"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Center - Numero da conta ou título */}
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-2xl font-bold">
            {showAccountNumber ? numeroConta : title}
          </Text>
        </View>

        {/* Right Side - Notificações */}
        <TouchableOpacity onPress={handleNotificacoesPress} className="p-2">
          <MaterialIcons
            name="notifications"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}