// SpotifyLink.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const SpotifyLink = ({ url }) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <Text style={styles.spotifyLinkText}>Listen on Spotify</Text>
  </TouchableOpacity>
);

export default SpotifyLink;

const styles = {
  spotifyLinkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
};
