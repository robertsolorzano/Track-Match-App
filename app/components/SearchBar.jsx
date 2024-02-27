// SearchBar.jsx
import React, { useState, useRef } from 'react';
import { View, TextInput, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const SearchBar = ({ searchText, setSearchText, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedWidth = useRef(new Animated.Value(0)).current; // The animated value for width

  // Function to handle the focus event
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  // Function to handle the cancel button press
  const handleCancel = () => {
    setIsFocused(false);
    setSearchText(''); // Clear the search input
    Animated.timing(animatedWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  // The interpolated width for the search bar
  const searchBarWidth = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['96%', '75%'] // Adjust the output range to your liking
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchContainer, { width: searchBarWidth }]}>
        <TextInput
          placeholder="Search for Artist or Song..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          returnKeyType="search"
          onFocus={handleFocus}
          onSubmitEditing={onSearch}
        />
        <Icon
          name="search"
          size={20}
          color="#303030"
          style={styles.searchIcon}
          onPress={onSearch}
        />
      </Animated.View>
      {isFocused && (
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 55,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 24,
    backgroundColor: '#fff',
    height: 40,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    paddingLeft: 45,
    fontSize: 16,
    color: '#303030',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
    paddingLeft: 5,
  },
  cancelButton: {
    padding: 10,
    // Add styling for the cancel button here
  },
});
