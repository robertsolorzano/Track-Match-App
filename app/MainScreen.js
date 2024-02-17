//MainScreen.js

import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView , StyleSheet } from 'react-native';
import { displayTrackInfo as DisplayTrackInfo } from '../app/TrackDisplay'; // Notice the capitalization


const App = () => {
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

  
function renderSearchResults() {
  if (searchResults && Array.isArray(searchResults.tracks)) {
    return (
      <ScrollView>
        {DisplayTrackInfo(searchResults)}
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>No results to display</Text>
      </View>
    );
  }
}

  return (
    <View style={styles.container}>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Track Match</Text>
          <Image source={require('../assets/FullLogo_Transparent_NoBuffer.png')} style={styles.logo} />
        </View>
        <View style={styles.containerMotto}>
          <Text style={styles.motto}>
        Search your favorite tracks and discover perfect harmonic matches from a vast library of over 100 million songs
          </Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for Artist & Song Title..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            style={styles.searchInput}
          />
              <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
        </View>
      {/* display search results */}
      <View>


        </View>
      </View>
      <Text>Search Results:</Text>
            {renderSearchResults()}
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
  containerMotto: {
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  motto: {
    color: '#fff',
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#403e44',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#00a5ff',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
  },
  resultTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
});
export default App;
