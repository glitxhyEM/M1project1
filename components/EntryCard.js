import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function EntryCard({ entry, onPress, onLongPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} onLongPress={onLongPress}>
      <Image source={{ uri: entry.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.caption} numberOfLines={2}>{entry.caption}</Text>
        <Text style={styles.date}>{entry.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  textContainer: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '600' },
  caption: { fontSize: 14, color: '#666' },
  date: { fontSize: 12, color: '#999' },
});
