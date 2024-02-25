// SpotifyLink.jsx
import React from 'react';
import { TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';

const SpotifyLink = ({ url }) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <Image
      style={styles.spotifyLogo}
      source={require('../assets/spotify-logo-png-7057.png')} // Make sure the path is correct
    />
  </TouchableOpacity>
);

export default SpotifyLink;

const styles = StyleSheet.create({
  spotifyLogo: {
    width: 30, 
    height: 30, 
  },
});
