import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import LibrarySearchBar from '../components/LibrarySearchBar'; 
import { keyNumberToLetter, modeNumberToMusicalKey } from '../utils/musicUtils'; // Import musicUtils functions

const FoldersScreen = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = () => {
    const db = getDatabase();
    const savedSongsRef = ref(db, 'savedSongs');
    const unsubscribe = onValue(savedSongsRef, (snapshot) => {
      const data = snapshot.val();
      const songs = data ? Object.values(data) : [];
      const foldersMap = {};
      songs.forEach(song => {
        const { key, mode } = song.audioFeatures; // Extract key and mode
        const folderName = `${keyNumberToLetter(key)} ${modeNumberToMusicalKey(mode)}`;
        if (!foldersMap[folderName]) {
          foldersMap[folderName] = [];
        }
        foldersMap[folderName].push(song);
      });
      const newFolders = Object.keys(foldersMap).map(folderName => ({
        id: folderName,
        name: folderName,
        songs: foldersMap[folderName]
      }));
      setFolders(newFolders);
    });
  
    return () => unsubscribe();
  };
  
  const navigation = useNavigation();

  const handleFolderPress = (folder) => {
    navigation.navigate('Library', { folderSongs: folder.songs }); // Pass folder songs as navigation param
  };

  return (
    <View style={styles.container}>
      <LibrarySearchBar searchText="" setSearchText={() => {}} /> 
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFolderPress(item)}>
            <View style={styles.folderItem}>
              <Text style={styles.folderText}>{item.name}</Text> 
              {/* Display song count for each folder */}
              <Text style={styles.songCount}>{item.songs ? `${item.songs.length} songs` : ''}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  folderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  folderText: {
    fontSize: 18,
  },
  songCount: {
    color: '#888',
  },
});

export default FoldersScreen;
