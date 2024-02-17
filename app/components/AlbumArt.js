// AlbumArt.js
import React from 'react';
import { Image } from 'react-native';

const AlbumArt = ({ url }) => (
  <Image source={{ uri: url }} style={styles.albumCover} />
);

export default AlbumArt;

const styles = {
  albumCover: {
    width: 100, 
    height: 100, 
    borderRadius: 10,
    marginTop: 10,
  },
};
