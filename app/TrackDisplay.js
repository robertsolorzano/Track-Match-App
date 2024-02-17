//TrackDisplay.js

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'; 

//set variable of current audio player to null
let currentlyPlayingAudio = null;

export function keyNumberToLetter(keyNumber) {
    const numberMap = {
        0: 'C',
        1: 'C#',
        2: 'D',
        3: 'D#',
        4: 'E',
        5: 'F',
        6: 'F#',
        7: 'G',
        8: 'G#',
        9: 'A',
        10: 'A#',
        11: 'B'
    };
    return numberMap[keyNumber];
}

export function timeNumberToFraction(timeNumber) {
    const numberTimeMap = {
        3: '3/4',
        4: '4/4',
        5: '5/4',
        6: '6/4',
        7: '7/4',
    };
    return numberTimeMap[timeNumber];
}


export function modeNumberToMusicalKey(modeNumber) {
    const numberModeMap = {
        0: 'Minor',
        1: 'Major',
    };
    return numberModeMap[modeNumber];
}

export function togglePlayPause(audioPlayer, playIcon) {
    if (currentlyPlayingAudio && currentlyPlayingAudio !== audioPlayer) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.parentNode.querySelector('.play-icon').style.backgroundImage = 'url("assets/images/play-icon.png")';
    }
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.style.backgroundImage = 'url("assets/pause-icon.png")';
    } else {
        audioPlayer.pause();
        playIcon.style.backgroundImage = 'url("assets/play-icon.png")';
    }
    currentlyPlayingAudio = audioPlayer.paused ? null : audioPlayer;
}

export function msToTime(duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


  export function displayTrackInfo(data) {
    const {
      tracks,
      analysisSongs,
      relativeSongs,
      analysisNewTempoSongs,
      relativeNewTempoSongs,
      originalTrack 
    } = data;

    

      //use the 'id' of the original track to compare with other tracks
//safeguard against null values for originalTrack
const originalTrackId = originalTrack ? originalTrack.id : null;

    const trackElements = [];

    const audioFeaturesMap = new Map();
  
    const relativeSongIds = new Set([...relativeSongs, ...analysisNewTempoSongs].map(song => song.id));

    [analysisSongs, relativeSongs, analysisNewTempoSongs, relativeNewTempoSongs].forEach((featureArray) => {
      featureArray.forEach((feature) => {
        if (feature && feature.id) {
          audioFeaturesMap.set(feature.id, feature);
        }
      });
    });
  
    tracks.forEach((track) => {
      if (track && track.id) {
        if (track.id !== originalTrackId) {
          const audioFeatures = audioFeaturesMap.get(track.id);
          if (audioFeatures) {
            // Determine if the audio feature is from a relative array
            const isRelative = relativeSongIds.has(audioFeatures.id);
            // Create track element with the matched audio features and relative status
            const trackElement = createTrackElement(track, audioFeatures, isRelative);
            trackElements.push(trackElement);
          }
        } else {
          console.log(`Duplicate track with ID: ${track.id} (original track) was excluded`);
        }
      }
    });
  return trackElements;
  }
  
  //function to generate track elements
  export function createTrackElement(track, audioFeatures, isRelative) {
    //use the existing functions to convert values
    const mode = modeNumberToMusicalKey(audioFeatures.mode);
    const timeSignature = timeNumberToFraction(audioFeatures.time_signature);
    const duration = msToTime(audioFeatures.duration_ms);
    const albumArtUrl = track.album && track.album.images && track.album.images[0] && typeof track.album.images[0].url === 'string'
        ? track.album.images[0].url 
        : 'defaultImageUrl'; 
    const previewUrl = track.preview_url || 'defaultPreviewUrl';
    const spotifyLink = track.external_urls && track.external_urls.spotify ? track.external_urls.spotify : '#';

    return (
        <View key={track.id} style={styles.trackContainer}>
            <Text style={styles.trackTitle}>{track.name}</Text>
            <Text style={styles.trackInfo}>{isRelative ? 'Relative Track' : 'Original Track'}</Text>
            <Text style={styles.trackInfo}>Key: {keyNumberToLetter(audioFeatures.key)} {mode}</Text>
            <Text style={styles.trackInfo}>Tempo: {audioFeatures.tempo.toFixed(2)} BPM</Text>
            <Text style={styles.trackInfo}>Time Signature: {timeSignature}</Text>
            <Text style={styles.trackInfo}>Duration: {duration}</Text>

            <Image 
                source={{ uri: albumArtUrl }} 
                style={styles.albumCover} 
            />
                  <TouchableOpacity onPress={spotifyLink}>
                    <Text style={styles.spotifyLinkText}>Listen on Spotify</Text>
                </TouchableOpacity>
            {/* Assuming you want to do something with the preview URL */}
            <Text>Preview URL: {previewUrl}</Text>
        </View>
        
    );
    
}
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
  



export default displayTrackInfo;