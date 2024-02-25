import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component

const SearchBar = ({ searchText, setSearchText, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search for Artist & Song Title..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
        returnKeyType="search" // Set the return key to "search"
        onSubmitEditing={onSearch} // Trigger search when the search (return) key is pressed
      />
      <Icon
        name="search"
        size={20}
        color="#403e44"
        style={styles.searchIcon}
        onPress={onSearch} // Allow icon to be pressed to initiate search
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 55,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#403e44',
    borderRadius: 24,
    backgroundColor: '#fff',
    width: '95%',
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto', 
  },
  searchInput: {
    flex: 1,
    padding: 10,
    paddingLeft: 45,
    paddingRight: 45,
    fontSize: 16,
    color: '#403e44',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
    paddingLeft: 5,
  },
});
