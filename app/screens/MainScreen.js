// MainScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar'; // Corrected path
import SearchResults from '../components/SearchResults'; // Corrected path

const MainScreen  = () => {
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
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Track Match</Text>
        <Image source={require('../assets/FullLogo_Transparent_NoBuffer.png')} style={styles.logo} />
      </View>

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
      />

      <Text style={styles.resultTitle}>Search Results:</Text>
      <SearchResults results={searchResults} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#403e44',
    padding: 10,
    paddingTop: 50, 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 45,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  resultTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
});
export default MainScreen;
