// LibraryScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackElement from '../components/TrackElement';
import SearchBar from '../components/SearchBar'; // Import the SearchBar component

const LibraryScreen = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]); // State for the filtered list
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getLikedSongs();
  }, []);

  useEffect(() => {
    // Filter liked songs based on the search text
    if (searchText === '') {
      setFilteredSongs(likedSongs);
    } else {
      setFilteredSongs(
        likedSongs.filter(song =>
          song.title.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, likedSongs]);

  const getLikedSongs = async () => {
    try {
      const likedSongsJson = await AsyncStorage.getItem('savedSongs');
      let savedSongs = likedSongsJson != null ? JSON.parse(likedSongsJson) : [];
      // Filter out any songs that do not have an id
      savedSongs = savedSongs.filter(song => song.id !== undefined);
      console.log('Liked songs fetched:', savedSongs);
      setLikedSongs(savedSongs);
      setFilteredSongs(savedSongs);
    } catch (error) {
      console.error('Error fetching liked songs from storage:', error);
    }
  };
  
  const renderItem = ({ item }) => (
    <TrackElement track={item} />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={() => { }} 
      />
      <FlatList
        data={filteredSongs}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.resultTitle}>No songs Saved</Text>}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  resultTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#000',
  },
});

export default LibraryScreen;
