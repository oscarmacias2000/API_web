// src/context/AppContext.js
import React, { createContext, useState, useContext, use, useEffect } from 'react';
import {register as registerApi, login as loginApi, logout as logoutApi, getCurrentUser} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    //cargar usuario actual al iniciar la app
    loadUser();
  }, []);

   const loadUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };
  // AppContext.js
const register = async (userData) => {
  console.log('=== register en contexto ===');
  console.log('Datos recibidos:', userData);
  
  try {
    const response = await api.post('/auth/register', userData);
    console.log('Respuesta del servidor:', response.data);
    
    if (response.data.token) {
      await AsyncStorage.setItem('@Stablecoin:token', response.data.token);
      await AsyncStorage.setItem('@Stablecoin:user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error en register contexto:', error);
    console.error('Response:', error.response?.data);
    throw error.response?.data || { error: 'Error en el registro' };
  }
};

    const login = async (credentials) => {
    setError(null);
    try {
      const response = await loginApi(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.error || 'Error al iniciar sesión');
      throw err;
    }
  };

// src/context/AppContext.js - Función logout simplificada
const logout = async () => {
  try {
    await AsyncStorage.multiRemove(['@auth_token', '@user']);
    setUser(null);
    return true;
  } catch (error) {
    console.error('Error en logout:', error);
    return false;
  }
};


  return (
    <AppContext.Provider value={{ user, setUser, loading, error, register, login,logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext)
  if(!context){
     throw new Error('useApp must be used within an AppProvider')
  }
  return context;
}

// Asegúrate de exportar correctamente
export default AppContext;