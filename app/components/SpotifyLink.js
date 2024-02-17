import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';

const SpotifyLink = ({ url }) => (
  <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(url)}>
    <Text style={styles.spotifyLinkText}>Listen on Spotify</Text>
  </TouchableOpacity>
);

export default SpotifyLink;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1DB954',
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
    width: 200, 
    //alignSelf: 'center', //center later when more styles add
  },
  spotifyLinkText: {
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
