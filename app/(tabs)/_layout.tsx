import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="contratar"
                options={{
                    title: 'Contratar',
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="request-quote" color={color} />,
                }}
            />
            <Tabs.Screen
                name="emprestimos"
                options={{
                    title: 'Emprestimos',
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="receipt-long" color={color} />,
                }}
            />
        </Tabs>
    );
}
