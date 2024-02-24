// TrackElement.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { keyNumberToLetter, modeNumberToMusicalKey, timeNumberToFraction, msToTime } from '../utils/musicUtils';
import AlbumArt from './AlbumArt';
import SpotifyLink from './SpotifyLink';
import { playSound } from './AudioManager';

const TrackElement = ({ track, audioFeatures, isRelative }) => {
  const mode = modeNumberToMusicalKey(audioFeatures.mode);
  const keyLetter = keyNumberToLetter(audioFeatures.key);
  const timeSignature = timeNumberToFraction(audioFeatures.time_signature);
  const duration = msToTime(audioFeatures.duration_ms);
  const albumArtUrl = track.album.images[0].url;
  const spotifyUrl = track.external_urls.spotify;
  const previewUrl = track.preview_url;

  return (
    <View style={styles.trackContainer}>
      <AlbumArt url={albumArtUrl} />
      <Text style={styles.trackTitle}>{track.name}</Text>
      <Text style={styles.trackInfo}>
        {isRelative ? 'Relative' : 'Original'} Key: {keyLetter} {mode}
      </Text>
      <Text style={styles.trackInfo}>Tempo: {audioFeatures.tempo.toFixed(2)} BPM</Text>
      <Text style={styles.trackInfo}>Time Signature: {timeSignature}</Text>
      <Text style={styles.trackInfo}>Duration: {duration}</Text>
      <SpotifyLink url={spotifyUrl} />
      {previewUrl && (
        <Button title="Play Preview" onPress={() => playSound(previewUrl)} />
      )}
    </View>
  );
};

export default TrackElement;

const styles = {
    trackContainer: {
      backgroundColor: '#ffffff',
      padding: 10,
      marginBottom: 40,
      borderRadius: 15,
      width: 250,
      alignSelf: 'center',
    },
    trackTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    trackInfo: {
      fontSize: 14,
      alignSelf: 'center',
    },
    previewContainer: {
      marginTop: 10,
      alignSelf: 'center',
    },
    previewLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
};
