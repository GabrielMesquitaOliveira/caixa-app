
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Usuario } from '@/services';
import React from 'react';
import { Text, View } from 'react-native';

interface WelcomeHeaderProps {
  usuario: Usuario;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ usuario }) => {
  const getPrimeiroNome = (nome: string) => nome?.split(' ')[0] || 'Usuário';

  return (
    <View className="w-full h-1/4 bg-[#005CA9] rounded-b-2xl">
      <View className="flex flex-row gap-4 items-center justify-center m-8 mt-12">
        <Avatar size="xl">
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </Avatar>
        <View>
          <Text className="text-4xl font-semibold text-white">
            Olá, {getPrimeiroNome(usuario.nome)}!
          </Text>
          <Text className="text-lg text-blue-100 mt-1">
            {usuario.profissao}
          </Text>
        </View>
      </View>
    </View>
  );
};
