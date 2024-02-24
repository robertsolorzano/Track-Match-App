// SearchBar.jsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'; // Import necessary components

const SearchBar = ({ searchText, setSearchText, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search for Artist & Song Title..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
});
