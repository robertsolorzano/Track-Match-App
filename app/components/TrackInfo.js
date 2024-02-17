// TrackInfo.js
import React from 'react';
import { View, Text } from 'react-native';
import { keyNumberToLetter, modeNumberToMusicalKey, timeNumberToFraction, msToTime } from './musicUtils';

const TrackInfo = ({ track, audioFeatures, isRelative }) => {
  // Use the utility functions for conversions
  const key = keyNumberToLetter(audioFeatures.key);
  const mode = modeNumberToMusicalKey(audioFeatures.mode);
  const timeSignature = timeNumberToFraction(audioFeatures.time_signature);
  const duration = msToTime(audioFeatures.duration_ms);

  return (
    <View>
      <Text style={styles.trackTitle}>{track.name}</Text>
      <Text style={styles.trackInfo}>{isRelative ? 'Relative Track' : 'Original Track'}</Text>
      <Text style={styles.trackInfo}>Key: {key} {mode}</Text>
      //add timeSignature & duration later
    </View>
  );
};

export default TrackInfo;

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
  