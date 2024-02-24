// AlbumArt.jsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const AlbumArt = ({ url }) => (
  <Image source={{ uri: url }} style={styles.albumCover} />
);

export default AlbumArt;

const styles = StyleSheet.create({
  albumCover: {
    width: 200, 
    height: 200, 
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
});
