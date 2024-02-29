// SearchScreen.jsx
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native'; 
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
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
    setIsLoading(true); // Set loading to true before fetching
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
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.searchBar}
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
      />
      {isLoading ? ( // Conditional rendering based on loading state
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#999999" />
        </View>
      ) : (
        <SearchResults results={searchResults} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Center the loader vertically
    alignItems: 'center', // Center the loader horizontally
  },
});

export default SearchScreen;
