// RegisterScreen.js mejorado
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useApp } from '../context/AppContext';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useApp();

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return false;
    }
    if (!password) {
      Alert.alert('Error', 'Por favor ingresa una contraseña');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
  console.log('1. Iniciando registro...');
  console.log('2. Datos a enviar:', { name, email, password });
    console.log(' Datos a enviar', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password
    });
    
    
    
    if (!validateForm()){
      console.log('Validación fallida');
      return;
    } 
   
    console.log('3. Validación exitosa, preparando datos...');
    setLoading(true);

    const userData = { 
    name: name.trim(), 
    email: email.trim().toLowerCase(), 
    password 
  };

    console.log('4. Datos a enviar:', userData);
    try {
      const response = await register(userData,{ 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        password 
      });
      console.log('3. Respuesta del servidor:', response);
      Alert.alert(
        'Éxito', 
        'Usuario registrado correctamente',
        [
          {
            text: 'Ir a iniciar Sesion!',
            onPress: () =>{
              setName('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');

              navigation.navigate('Login');
            }
          }
        ]
      );
    } catch (error) {
       console.log('❌ Error detallado:', error);
       console.log('❌ Response data:', error.response?.data);
       console.log('❌ Response status:', error.response?.status);

      Alert.alert('Error', error.error || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
        editable={!loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        editable={!loading}
      />
      
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        disabled={loading}
      >
        <Text style={styles.link}>
          ¿Ya tienes cuenta? Inicia sesión aquí
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});