// TrackElement.jsx
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { keyNumberToLetter, modeNumberToMusicalKey, timeNumberToFraction, msToTime } from '../utils/musicUtils';
import AlbumArt from './AlbumArt';
import SpotifyLink from './SpotifyLink';
import AudioPlayer from './AudioPlayer';

const TrackElement = ({ track, audioFeatures }) => {
  const mode = modeNumberToMusicalKey(audioFeatures.mode);
  const keyLetter = keyNumberToLetter(audioFeatures.key);
  const timeSignature = timeNumberToFraction(audioFeatures.time_signature);
  const duration = msToTime(audioFeatures.duration_ms);
  const albumArtUrl = track.album.images[0].url;
  const spotifyUrl = track.external_urls.spotify;
  const previewUrl = track.preview_url;

  return (
    <View style={styles.trackContainer}>
      {/* Left Section for Album Art */}
      <View>
        <AlbumArt url={albumArtUrl} />
      </View>

      {/* Middle Section for Title and Artist */}
      <View style={styles.middleSection}>
        <Text style={styles.trackTitle}>{track.name}</Text>
        <Text style={styles.trackArtist}>{track.artists.map((artist) => artist.name).join(', ')}</Text>
      </View>

      {/* Right Section for Key, Time Signature, Tempo, Duration, and Spotify Link */}
      <View style={styles.rightSection}>
        {/* Key and Time Signature */}
        <View style={styles.keyTimeContainer}>
          <Text style={styles.trackKeyTime}>
            {keyLetter} {mode}
          </Text>
          <Text style={styles.trackKeyTime}>{timeSignature}</Text>
        </View>

        {/* Tempo and Duration */}
        <View style={styles.tempoDurationContainer}>
          <Text style={styles.trackTempoDuration}>{audioFeatures.tempo.toFixed(2)} BPM</Text>
          <Text style={styles.trackTempoDuration}>{duration}</Text>
        </View>

        {/* Spotify Link */}
        <View>
          <SpotifyLink url={spotifyUrl} />
        </View>
      </View>
    </View>
  );
};

      {/* <View>
        <SpotifyLink url={spotifyUrl} />
      </View> */}
            {/* {previewUrl && (
        <View style={styles.previewContainer}>
          <AudioPlayer previewUrl={previewUrl} />
        </View>
      )} */}
      // <AlbumArt url={albumArtUrl} style={styles.albumArt} />


export default TrackElement;

const styles = StyleSheet.create({
  trackContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#303030',
  },
  middleSection: {
    justifyContent: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  keyTimeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: 70,
  },
  tempoDurationContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: 70,
    marginLeft: 20,
  },
  trackTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    maxWidth: 100,
  },
  trackArtist: {
    fontSize: 12,
    color: '#000000',
  },
  trackKeyTime: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'right',
    alignSelf: 'center',
  },
  trackTempoDuration: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'right',
    alignSelf: 'center',
  },
    // previewContainer: {
    //   marginTop: 10,
    //   alignSelf: 'center',
    //   width: 180, 
    // },
});
