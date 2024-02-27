// LibrarySearchBar.jsx
import React, {useRef } from 'react';
import { View, TextInput, Animated, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LocalSearchBar = ({ searchText, setSearchText }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(animatedWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCancel = () => {
    setSearchText('');
    Keyboard.dismiss();
    Animated.timing(animatedWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const clearInput = () => setSearchText('');

  const searchBarWidth = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['96%', '80%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchContainer, { width: searchBarWidth }]}>
        <Icon name="search" size={20} color="#303030" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for Artist or Song..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          onFocus={handleFocus}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearIconContainer}>
            <Icon name="times-circle" size={18} color="#303030" />
          </TouchableOpacity>
        )}
      </Animated.View>
      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 24,
    backgroundColor: '#fff',
    height: 40,
    paddingLeft: 10,
    left: 6,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#303030',
  },
  searchIcon: {
    zIndex: 10,
  },
  clearIconContainer: {
    paddingRight: 10,
  },
  cancelButton: {
    padding: 10,
    marginLeft: 15,
  },
  cancelText: {
    fontWeight: 'bold',
  },
});

export default LocalSearchBar;
