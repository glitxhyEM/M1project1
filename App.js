import { useState, useMemo } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TextInput, Alert, Switch, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ActionButton from './components/ActionButton';
import EntryCard from './components/EntryCard';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');

  // 1. EXTENSION STATE
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'title'
  const [editingId, setEditingId] = useState(null);

  // 2. SEARCH & SORT LOGIC
  const filteredEntries = useMemo(() => {
    let result = entries.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      // Fallback to ID/creation time if date string isn't perfectly comparable
      return b.id.localeCompare(a.id);
    });
  }, [entries, searchQuery, sortBy]);

  const addEntry = () => {
    if (!newTitle) return;

    if (editingId) {
      // Edit existing
      setEntries(entries.map(e => e.id === editingId ?
        { ...e, title: newTitle, caption: newCaption } : e
      ));
      setEditingId(null);
    } else {
      // Add new
      const entry = {
        id: Date.now().toString(),
        title: newTitle,
        caption: newCaption,
        imageUrl: `https://picsum.photos/200?random=${Date.now()}`,
        date: new Date().toLocaleDateString(),
      };
      setEntries([entry, ...entries]);
    }

    setNewTitle('');
    setNewCaption('');
    setIsAdding(false);
  };

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setNewTitle(entry.title);
    setNewCaption(entry.caption);
    setIsAdding(true);
  };

  const deleteEntry = (id) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm("Are you sure you want to remove this memory?");
      if (confirmed) {
        setEntries(entries.filter(e => e.id !== id));
        setSelectedEntry(null);
      }
      return;
    }

    Alert.alert(
      "Delete Entry",
      "Are you sure you want to remove this memory?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setEntries(entries.filter(e => e.id !== id));
            setSelectedEntry(null);
          }
        }
      ]
    );
  };

  // 3. THEME STYLES
  const themeContainer = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const themeText = isDarkMode ? styles.darkText : styles.lightText;
  const themeHeader = isDarkMode ? styles.darkHeader : styles.lightHeader;

  if (selectedEntry) {
    return (
      <View style={[styles.container, themeContainer]}>
        <View style={styles.detailHeader}>
          <ActionButton title="← Back" onPress={() => setSelectedEntry(null)} variant="secondary" />
          <ActionButton title="Delete" onPress={() => deleteEntry(selectedEntry.id)} variant="secondary" />
        </View>
        <Image source={{ uri: selectedEntry.imageUrl }} style={styles.detailImage} />
        <Text style={[styles.detailTitle, themeText]}>{selectedEntry.title}</Text>
        <Text style={[styles.detailCaption, themeText]}>{selectedEntry.caption}</Text>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </View>
    );
  }

  return (
    <View style={[styles.container, themeContainer]}>
      {/* THEME TOGGLE & SEARCH BAR */}
      <View style={styles.toolbar}>
        <Text style={[styles.header, themeHeader]}>My Photo Journal</Text>
        <TextInput
          placeholder="Search entries..."
          placeholderTextColor={isDarkMode ? "#888" : "#999"}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, isDarkMode && styles.darkInput]}
        />
        <View style={styles.row}>
          <Text style={[styles.themeLabel, themeText]}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
          <ActionButton
            title={`Sort: ${sortBy}`}
            onPress={() => setSortBy(sortBy === 'date' ? 'title' : 'date')}
            variant="secondary"
          />
        </View>
      </View>

      {isAdding ? (
        <View style={styles.form}>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#999"
            value={newTitle}
            onChangeText={setNewTitle}
            style={[styles.input, isDarkMode && styles.darkInput]}
          />
          <TextInput
            placeholder="Caption"
            placeholderTextColor="#999"
            value={newCaption}
            onChangeText={setNewCaption}
            multiline
            style={[styles.input, styles.multilineInput, isDarkMode && styles.darkInput]}
          />
          <ActionButton title={editingId ? "Update Entry" : "Save Entry"} onPress={addEntry} />
          <ActionButton title="Cancel" onPress={() => { setIsAdding(false); setEditingId(null); }} variant="secondary" />
        </View>
      ) : (
        <FlatList
          data={filteredEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EntryCard
              entry={item}
              onPress={() => setSelectedEntry(item)}
              onLongPress={() => startEdit(item)}
            />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No entries found. Tap + New Entry!</Text>}
        />
      )}

      {!isAdding && (
        <View style={styles.footer}>
          <ActionButton title="+ New Entry" onPress={() => setIsAdding(true)} />
        </View>
      )}
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: { fontSize: 32, fontWeight: 'bold', paddingVertical: 8 },
  lightHeader: { color: '#000' },
  darkHeader: { color: '#fff' },

  // Theme Styles
  lightContainer: { backgroundColor: '#f5f5f5' },
  darkContainer: { backgroundColor: '#1a1a1a' },
  lightText: { color: '#000' },
  darkText: { color: '#fff' },
  darkInput: { backgroundColor: '#333', color: '#fff' },

  // Toolbar
  toolbar: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  searchInput: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  themeLabel: { fontSize: 16, fontWeight: '500' },

  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10 },
  multilineInput: { height: 100, textAlignVertical: 'top' },
  form: { padding: 20 },
  footer: { padding: 16, borderTopWidth: 1, borderColor: '#eee' },
  detailImage: { width: '100%', height: 300 },
  detailTitle: { fontSize: 28, padding: 16, fontWeight: 'bold' },
  detailCaption: { fontSize: 18, paddingHorizontal: 16, lineHeight: 24 },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});
