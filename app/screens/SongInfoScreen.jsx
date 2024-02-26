// SongInfoScreen.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { keyNumberToLetter, modeNumberToMusicalKey, timeNumberToFraction, msToTime } from '../utils/musicUtils';

const SongInfoScreen = ({ route }) => {
  const { track, audioFeatures } = route.params;
  const navigation = useNavigation();

  // Using utility functions for conversions
  const key = `${keyNumberToLetter(audioFeatures.key)} ${modeNumberToMusicalKey(audioFeatures.mode)}`;
  const timeSignature = timeNumberToFraction(audioFeatures.time_signature);
  const tempo = audioFeatures.tempo.toFixed(2);
  const duration = msToTime(audioFeatures.duration_ms);

  return (
    <View style={styles.container}>
      {/* Custom Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Album Art */}
      <Image
        source={{ uri: track.album.images[0].url }}
        style={styles.albumArt}
      />

      {/* Track Title */}
      <Text style={styles.trackTitle}>{track.name}</Text>

      {/* Artist Name */}
      <Text style={styles.artistName}>{track.artists.map((artist) => artist.name).join(', ')}</Text>


      {/* Audio Features Grid */}
      <View style={styles.audioFeaturesGrid}>
        {/* Key */}
        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>Key</Text>
          <Text style={styles.featureValue}>{key}</Text>
        </View>

        {/* Time Signature */}
        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>Time Signature</Text>
          <Text style={styles.featureValue}>{timeSignature}</Text>
        </View>

        {/* Tempo */}
        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>Tempo</Text>
          <Text style={styles.featureValue}>{tempo} BPM</Text>
        </View>

        {/* Duration */}
        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>Duration</Text>
          <Text style={styles.featureValue}>{duration}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
    },
    backButton: {
      alignSelf: 'flex-start',
      marginLeft: 10,
      marginTop: 10,
    },
    albumArt: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
      marginTop: 20,
    },
    trackTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
    },
    artistName: {
      fontSize: 18,
      color: 'gray',
      marginTop: 10,
    },
    audioFeaturesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      marginTop: 20,
      width: '90%',
    },
    featureContainer: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      margin: 5,
      width: '40%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    featureTitle: {
      fontSize: 16,
      color: 'black',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 5,
    },
    featureValue: {
      fontSize: 14,
      color: 'gray',
      textAlign: 'center',
    },
  });

  
export default SongInfoScreen;
