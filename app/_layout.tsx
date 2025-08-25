import { Header } from "@/components/Header";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    CAIXASTD_Regular: require('../assets/fonts/CAIXAStd-Regular.ttf'),
    CAIXASTD_Bold: require('../assets/fonts/CAIXAStd-Bold.ttf'),
    CAIXASTD_Light: require('../assets/fonts/CAIXAStd-Light.ttf'),
  });

  if (!fontsLoaded) return null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ header: Header }} />
    </Stack>
  );
}
