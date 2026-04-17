// src/navigation/MainNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View } from 'react-native';

import Dashboard from '../main/Dashboard'
import SendScreen from '../main/SendScreen';
import ReceiveScreen from '../main/ReceiveScreen';
import HistoryScreen from '../main/HistoryScreen';
import ProfileScreen from '../main/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Iconos simples (puedes instalar @expo/vector-icons para más opciones)
const TabIcon = ({ icon, focused }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 24 }}>{icon}</Text>
  </View>
);

// Tab Navigator principal
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          switch (route.name) {
            case 'Dashboard':
              icon = '🏠';
              break;
            case 'Send':
              icon = '📤';
              break;
            case 'Receive':
              icon = '📥';
              break;
            case 'History':
              icon = '📊';
              break;
            case 'Profile':
              icon = '👤';
              break;
          }
          return <TabIcon icon={icon} focused={focused} />;
        },
        tabBarActiveTintColor: '#2ecc71',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#2ecc71',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen 
        name="Send" 
        component={SendScreen} 
        options={{ title: 'Enviar' }}
      />
      <Tab.Screen 
        name="Receive" 
        component={ReceiveScreen} 
        options={{ title: 'Recibir' }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ title: 'Historial' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator para pantallas que necesitan navegación anidada
export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2ecc71',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}