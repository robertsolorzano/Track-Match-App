import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import TrackElement from '../components/TrackElement';
import LibrarySearchBar from '../components/LibrarySearchBar';
import { useNavigation } from '@react-navigation/native';

const LibraryScreen = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = () => {
    setRefreshing(true);
    const db = getDatabase();
    const savedSongsRef = ref(db, 'savedSongs');
    const unsubscribe = onValue(savedSongsRef, (snapshot) => {
      const data = snapshot.val();
      const savedSongs = data ? Object.values(data).map(item => ({
        track: item.track, 
        audioFeatures: item.audioFeatures 
      })) : [];
      setLikedSongs(savedSongs);
      setRefreshing(false);
    });
    
    return () => unsubscribe();
  };

  const onRefresh = () => {
    loadSongs();
  };

  // Filter songs based on search query
  const filteredSongs = likedSongs.filter(song =>
    song.track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.track.artists.join('').toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <View style={styles.container}>
      <LibrarySearchBar searchText={searchQuery} setSearchText={setSearchQuery} />
      <FlatList
        data={filteredSongs} // Use the filtered list based on search
        keyExtractor={(item) => item.track.id.toString()}
        renderItem={({ item }) => <TrackElement track={item.track} audioFeatures={item.audioFeatures} />}
        contentContainerStyle={styles.flatListContentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flatListContentContainer: {
    marginTop: 0, 
  },
});

export default LibraryScreen;
