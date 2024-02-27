// SearchScreen.jsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar'; 
import SearchResults from '../components/SearchResults'; 

const SearchScreen  = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({
    analysisSongs: [],
    relativeSongs: [],
    analysisNewTempoSongs: [],
    relativeNewTempoSongs: [],
    tracks: [],
    original: null,
    originalTrack: null
  });

  const handleSearch = async () => {
    try {
      const response = await fetch('http://192.168.0.51:3000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm: searchText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setSearchResults({
        analysisSongs: data.analysisSongs,
        relativeSongs: data.relativeSongs,
        analysisNewTempoSongs: data.analysisNewTempoSongs,
        relativeNewTempoSongs: data.relativeNewTempoSongs,
        tracks: data.tracks,
        original: data.original,
        originalTrack: data.originalTrack
      });

    } catch (error) {
      console.error('Error searching for tracks:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
      />
      <SearchResults results={searchResults} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
});

export default SearchScreen;
