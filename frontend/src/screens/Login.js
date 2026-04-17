import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useApp } from '../context/AppContext';
import { Image } from 'react-native'


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();

  const validateForm = () => {
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
      Alert.alert('Error', 'Por favor ingresa tu contraseña');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
      console.log('📧 Email enviado:', email.trim().toLowerCase());
      console.log('🔑 Password enviada:', password);
  
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await login({ 
        email: email.trim().toLowerCase(), 
        password 
      });
      
      console.log('Llogin exitoso!', response)

      Alert.alert(
        {
          text: 'OK',
          onPress: ()=>{
            navigation.replace("Home")
          }

        },
        'Éxito', 
        'Inicio de sesión exitoso',
        [{ text: 'OK', onPress: () => navigation.replace('Home') }]
      );
    } catch (error) {
      Alert.alert('Error', error.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

    const handleRegister = async() => {
      console.log('Pantallas disponibles:', navigation.getState()?.routes.map(r => r.name));
      navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image source={{uri: 'https://www.svgrepo.com/show/330397/expo.svg',}}
          style={{width: 200, height: 200, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', position: 'relative', left: '35%'}}/>
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          style={styles.linkContainer}
        >
          <Text style={styles.link}>
            ¿No tienes cuenta? Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '50%',
    position: 'relative',
    left: '30%',
    
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  linkContainer: {
    marginTop: 20,
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});