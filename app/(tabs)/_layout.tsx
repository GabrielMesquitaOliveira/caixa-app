import "@/app/global.css";
import { useCustomFonts } from "@/hooks/useFonts";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { ActivityIndicator, View } from "react-native";

export default function TabLayout() {
    NavigationBar.setButtonStyleAsync("light");
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#fff', // blue-500
                tabBarInactiveTintColor: '#f2f2f2', // gray-500
                tabBarLabelStyle: {
                    fontFamily: 'CAIXASTD_Bold',
                    fontSize: 14,
                    fontWeight: '600'
                },
                tabBarStyle: {
                    backgroundColor: '#005CA9', // bg-gray-800 como exemplo 
                },
                tabBarIconStyle: {
                    marginBottom: 2,
                },
                headerShown: false, // Remove o header se não precisar
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons
                            size={focused ? 30 : 28}
                            name="home"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="contratar"
                options={{
                    title: 'Contratar',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons
                            size={focused ? 30 : 28}
                            name="request-quote"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="emprestimos"
                options={{
                    title: 'Empréstimos',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons
                            size={focused ? 30 : 28}
                            name="receipt-long"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}