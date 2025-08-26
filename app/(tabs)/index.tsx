import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {

  return (
    <View className="h-full w-full flex items-center justify-top bg-neutral-100">

      {/* Welcome user */}
      <View className="w-full h-1/3 bg-[#005CA9] rounded-b-2xl">
        <View className="flex flex-row gap-4 items-center justify-center m-8">
          <Avatar size="xl">
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
          </Avatar>
          <Text className="text-4xl font-semibold text-white">Olá, Joana</Text>
        </View>
      </View>

      {/* Saldo devedor */}
      <View className="w-11/12 h-1/3 rounded-2xl bg-white flex flex-row items-center justify-center -mt-24 p-6">
        <View className="w-2/3 flex flex-col justify-center">
          <Text className="text-xl font-semibold">Saldo Devedor</Text>
          <Text className="text-3xl font-semibold">R$ 51.300,00</Text>
        </View>
        <View className="w-1/3 flex flex-col h-full justify-center">
          {/* grafico do saldo devedor */}
          
          <Text className="text-2xl font-semibold">R$ 1.000,00</Text>
        </View>
      </View>

    </View>
  );
}
