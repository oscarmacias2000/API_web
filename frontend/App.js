// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import { LogBox } from 'react-native';
// Importar contexto
import { AppProvider, useApp } from './src/context/AppContext';

// Importar pantallas
import Login from './src/screens/Login';
import Dashboard from './src/main/Dashboard'
import CardNewsModerno from './src/components/NewsCard';
import RegisterScreen from './src/screens/Register';


LogBox.ignoreLogs([
  '`useNativeDriver` is not supported',
  'Animated: `useNativeDriver`',
])


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Drawer Navigator para pantallas principales
function DrawerNavigator() {
  return (
     <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#10B981' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerStyle: { backgroundColor: '#fff', width: 280 },
        drawerActiveTintColor: '#10B981',
        drawerInactiveTintColor: '#666',
      }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{ 
          title: 'Dashboard',
          headerShown: false  // ← Esto oculta el header en Dashboard
        }}
      />
        <Drawer.Screen 
        name="news" 
        component={CardNewsModerno} 
        options={{ title: 'Noticias' }}
      />
     
</Drawer.Navigator>
  )}  
// Stack Navigator para autenticación
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }}
       />    
</Stack.Navigator>
   
  );
}

// Navegación principal
function Navigation() {
  const { user, loading } = useApp();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? <AuthStack /> : <DrawerNavigator />}
    </NavigationContainer>
  );
}

// App principal
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Navigation />
      </AppProvider>
    </GestureHandlerRootView>
  );
}