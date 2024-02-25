// AlbumArt.jsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const AlbumArt = ({ url }) => (
  <Image source={{ uri: url }} style={styles.albumCover} />
);

export default AlbumArt;

const styles = StyleSheet.create({
  albumCover: {
    width: 60, // Smaller width to fit the list layout
    height: 60, // Smaller height to match the width
    borderRadius: 5, // Reduced border radius for a subtler effect
    marginRight: 10, // Add some space between the album cover and the song details
  },
});
