import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const SearchBar = ({ searchText, setSearchText, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search for Artist or Song..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
        returnKeyType="search"
        onSubmitEditing={onSearch} 
      />
      <Icon
        name="search"
        size={20}
        color="#303030"
        style={styles.searchIcon}
        onPress={onSearch} 
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000000',
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
    color: '#303030',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
    paddingLeft: 5,
  },
});
