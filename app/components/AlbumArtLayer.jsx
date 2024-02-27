import React from 'react';
import { Image, StyleSheet } from 'react-native';

const AlbumArtLayer = ({ albumArt }) => {
  return (
    <Image source={{ uri: albumArt }} style={styles.albumArt} />
  );
};

const styles = StyleSheet.create({
    albumArt: {
        width: 75,
        height: 75, 
        borderRadius: 5, 
        marginRight: -65, 
    },
  });
  

export default AlbumArtLayer;
