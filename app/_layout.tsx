import { Header } from "@/components/Header";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen name="(tabs)" options={{ header: Header }} />
      </Stack>
      <StatusBar style="light" />
    </GluestackUIProvider>
  );
}
