import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import TrackElement from '../components/TrackElement';

const LibraryScreen = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const savedSongsRef = ref(db, 'savedSongs');
    const unsubscribe = onValue(savedSongsRef, (snapshot) => {
      const data = snapshot.val();
      const savedSongs = data ? Object.values(data).map(item => ({
        track: item.track, 
        audioFeatures: item.audioFeatures 
      })) : [];
      setLikedSongs(savedSongs);
    });
  
    // Return a cleanup function that removes the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={likedSongs}
        keyExtractor={(item) => item.track.id.toString()}
        renderItem={({ item }) => <TrackElement track={item.track} audioFeatures={item.audioFeatures} />}
        contentContainerStyle={styles.flatListContentContainer} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  flatListContentContainer: {
    marginTop: 80, 
  },
});

export default LibraryScreen;
