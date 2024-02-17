// TrackDisplay.js
import React from 'react';
import { View } from 'react-native';
import TrackElement from './components/TrackElement';

const TrackDisplay = ({ data }) => {
  const {
    tracks,
    analysisSongs,
    relativeSongs,
    analysisNewTempoSongs,
    relativeNewTempoSongs,
    originalTrack 
  } = data;

  const originalTrackId = originalTrack ? originalTrack.id : null;
  const audioFeaturesMap = new Map();
  
  const relativeSongIds = new Set([...relativeSongs, ...analysisNewTempoSongs].map(song => song.id));

  [analysisSongs, relativeSongs, analysisNewTempoSongs, relativeNewTempoSongs].forEach((featureArray) => {
    featureArray.forEach((feature) => {
      if (feature && feature.id) {
        audioFeaturesMap.set(feature.id, feature);
      }
    });
  });

  const trackElements = tracks.map((track) => {
    if (track && track.id && track.id !== originalTrackId) {
      const audioFeatures = audioFeaturesMap.get(track.id);
      if (audioFeatures) {
        const isRelative = relativeSongIds.has(audioFeatures.id);
        return <TrackElement key={track.id} track={track} audioFeatures={audioFeatures} isRelative={isRelative} />;
      }
    }
    return null;
  });

  return <View>{trackElements}</View>;
};

export default TrackDisplay;
