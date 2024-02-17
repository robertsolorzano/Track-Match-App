// TrackElement.js
import React from 'react';
import { View, Text } from 'react-native';
import { keyNumberToLetter, modeNumberToMusicalKey, timeNumberToFraction, msToTime } from '../utils/musicUtils';
import AlbumArt from './AlbumArt';
import SpotifyLink from './SpotifyLink';

const TrackElement = ({ track, audioFeatures, isRelative }) => {
  // Use the utility functions for conversions
  const mode = modeNumberToMusicalKey(audioFeatures.mode);
  const keyLetter = keyNumberToLetter(audioFeatures.key);
  const timeSignature = timeNumberToFraction(audioFeatures.time_signature);
  const duration = msToTime(audioFeatures.duration_ms);
  const albumArtUrl = track.album.images[0].url;
  const spotifyUrl = track.external_urls.spotify;

  return (
    <View style={styles.trackContainer}>
      <Text style={styles.trackTitle}>{track.name}</Text>
      <Text style={styles.trackInfo}>
        {isRelative ? 'Relative' : 'Original'} Key: {keyLetter} {mode}
      </Text>
      <Text style={styles.trackInfo}>Tempo: {audioFeatures.tempo.toFixed(2)} BPM</Text>
      <Text style={styles.trackInfo}>Time Signature: {timeSignature}</Text>
      <Text style={styles.trackInfo}>Duration: {duration}</Text>
      <AlbumArt url={albumArtUrl} />
      <SpotifyLink url={spotifyUrl} />
      {/* Preview URL or any other elements can be added here */}
    </View>
  );
};

export default TrackElement;

const styles = {
    trackContainer: {
      backgroundColor: '#ffffff',
      padding: 10,
      margin: 5,
      borderRadius: 5,
    },
    trackTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    trackInfo: {
      fontSize: 14,
    },
    albumCover: {
      width: 100, 
      height: 100, 
      borderRadius: 10,
      marginTop: 10, 
  },
  spotifyLinkText: {
    color: 'blue',
    textDecorationLine: 'underline',
},
};
  
