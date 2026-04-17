import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const API_URL = __DEV__ 
  ? 'http://localhost:3002/api'  // Desarrollo
  : 'https://api.tu-dominio.com/api'; // Producción

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});


// Interceptor para logs
api.interceptors.request.use(request => {
  console.log('📤 Petición:', request.method.toUpperCase(), request.baseURL + request.url);
  console.log('📦 Body:', request.data);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('📥 Respuesta:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('❌ Error en petición:', error.config?.url);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    return Promise.reject(error);
  }
);


// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@Stablecoin:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Al inicio del archivo
console.log('=== API CONFIGURACIÓN ===');
console.log('API_URL:', API_URL);
console.log('🚀 Backend debería estar en:', API_URL);
console.log('=======================');


// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado, limpiar almacenamiento
      await AsyncStorage.removeItem('@Stablecoin:token');
      await AsyncStorage.removeItem('@Stablecoin:user');
      // Redirigir a login (lo manejamos desde el componente)
    }
    return Promise.reject(error);
  }
);

// Función de registro
export const register = async (userData) => {
  console.log('Enviando peticion a: ', `${API_URL}/auth/register`)
  console.log('Datos a enviar:', JSON.stringify(userData, null, 2));
   try{
      const response = await api.post('/auth/register', userData);

    console.log('📥 Respuesta recibida:', response);
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    
      if(response.data.token){
        console.log('Guardando token y usuario en AsyncStorage');
        await AsyncStorage.setItem('@Stablecoin:token', response.data.token);
        await AsyncStorage.setItem('@Stablecoin:user', JSON.stringify(response.data.user));
        console.log('✅ Token y usuario guardados');
      }
      return response.data;
   } catch (error) {
    console.error('❌ Error en registro:');
    console.error('Mensaje:', error.message);
    console.error('Respuesta del servidor:', error.response?.data);
    console.error('Status:', error.response?.status);
    console.error('Headers:', error.response?.headers);
    throw error.response?.data || { error: 'Error en el registro' };
   }
};
// Función de login
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      await AsyncStorage.setItem('@auth_token', response.data.token);
      await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error de conexión' };
  }
};


export const logout = async () => {
   try{
    //Limpiar AsyncStorage
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('@user');
    console.log('Token y usuario eliminados');
    return true;
   }catch(error){
    console.error('Error en logout:', error);
   }
   
};

export const getCurrentUser = async () => {
  const userStr = await AsyncStorage.getItem('@user');
  return userStr ? JSON.parse(userStr) : null;
};

export default api;