import "@/app/global.css";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    NavigationBar.setButtonStyleAsync("light");

    const [fontsLoaded] = useFonts({
        CAIXASTD_Regular: require('../../assets/fonts/CAIXAStd-Regular.ttf'),
        CAIXASTD_Bold: require('../../assets/fonts/CAIXAStd-Bold.ttf'),
        CAIXASTD_Light: require('../../assets/fonts/CAIXAStd-Light.ttf'),
        CAIXASTD_SemiBold: require('../../assets/fonts/CAIXAStd-SemiBold.ttf'),
        CAIXASTD_ExtraBold: require('../../assets/fonts/CAIXAStd-ExtraBold.ttf'),
    });

    if (!fontsLoaded) return console.log("Carregando fontes...");
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