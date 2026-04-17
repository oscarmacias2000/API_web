// src/components/CustomDrawerContent.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useApp } from '../context/AppContext';

export default function CustomDrawerContent(props) {
  const { user, logout } = useApp();

  const handleLogout = async () => {
  Alert.alert(
    'Cerrar Sesión',
    '¿Estás seguro?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        style: 'destructive',
        onPress: async () => {
          await logout();
          // Cerrar el drawer y navegar
          props.navigation.closeDrawer();
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]
  );
};

  return (
    <DrawerContentScrollView {...props}>
      {/* Header del Drawer */}
      <View style={styles.drawerHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {/* Items del Drawer */}
      <DrawerItemList {...props} />

      {/* Botón de Cerrar Sesión */}
      <DrawerItem
        label="Cerrar Sesión"
        icon={({ color, size }) => (
          <Text style={{ fontSize: size }}>🚪</Text>
        )}
        onPress={handleLogout}
        labelStyle={{ color: '#EF4444' }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});