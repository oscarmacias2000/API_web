import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


// CardNewsModerno con placeholder por defecto
export default function CardNewsModerno({ news = {}, onPress }) {
  const {
    image = 'https://picsum.photos/id/104/400/200',
    category = 'Noticias',
    time = 'Reciente',
    title = 'Sin título',
    description = 'Sin descripción disponible',
    source = 'Fuente'
  } = news;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <View style={styles.footer}>
          <Text style={styles.source}>📰 {source}</Text>
          <Text style={styles.readMore}>Leer más →</Text>
        </View>
      </View>


       <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <View style={styles.footer}>
          <Text style={styles.source}>📰 {source}</Text>
          <Text style={styles.readMore}>Leer más →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: '15%',
    flexDirection: 'column',  // Vertical (esto es por defecto, no es necesario ponerlo)
    paddingHorizontal: 16,
  },
 card: {
    width: '15%',           // Ancho completo
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,        // Espacio entre cards
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  time: {
    fontSize: 11,
    color: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 11,
    color: '#10B981',
  },
  readMore: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },});