// src/components/PriceChart.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function PriceChart({ data, title, color }) {
  // Datos de ejemplo para el gráfico
  const chartData = [
    { date: 'Ene', price: 0.998 },
    { date: 'Feb', price: 0.999 },
    { date: 'Mar', price: 1.001 },
    { date: 'Abr', price: 0.997 },
    { date: 'May', price: 1.002 },
    { date: 'Jun', price: 1.000 },
    { date: 'Jul', price: 0.999 },
    { date: 'Ago', price: 1.001 },
    { date: 'Sep', price: 1.000 },
    { date: 'Oct', price: 1.002 },
    { date: 'Nov', price: 1.001 },
    { date: 'Dic', price: 1.000 },
  ];

  const maxPrice = Math.max(...chartData.map(d => d.price));
  const minPrice = Math.min(...chartData.map(d => d.price));
  const height = 150;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || '📈 Precios Históricos'}</Text>
      <Text style={styles.subtitle}>USDT / USD - Últimos 12 meses</Text>
      
      <View style={styles.chartContainer}>
        {/* Líneas de grid */}
        <View style={styles.gridLines}>
          {[1.002, 1.001, 1.000, 0.999, 0.998].map((price, i) => (
            <View key={i} style={styles.gridLine}>
              <Text style={styles.gridLabel}>{price.toFixed(3)}</Text>
              <View style={styles.line} />
            </View>
          ))}
        </View>
        
        {/* Barras del gráfico */}
        <View style={styles.barsContainer}>
          {chartData.map((item, index) => {
            const barHeight = ((item.price - minPrice) / (maxPrice - minPrice)) * height;
            return (
              <View key={index} style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar,
                    { 
                      height: barHeight,
                      backgroundColor: color || '#10B981'
                    }
                  ]} 
                />
                <Text style={styles.barLabel}>{item.date}</Text>
              </View>
            );
          })}
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Precio Actual</Text>
          <Text style={styles.statValue}>$1.0002</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Máximo 12m</Text>
          <Text style={styles.statValue}>$1.0025</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Mínimo 12m</Text>
          <Text style={styles.statValue}>$0.9978</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    top: '5%',
    backgroundColor: '#324549',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  chartContainer: {
    height: 180,
    flexDirection: 'row',
  },
  gridLines: {
    width: 45,
    height: 150,
    marginRight: 8,
  },
  gridLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 9,
    color: '#9CA3AF',
    width: 40,
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#E5E7EB',
    marginLeft: 4,
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  barLabel: {
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
});