// SongInfoScreen.jsx
import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import DropdownMenu from '../components/DropdownMenu';
import AudioPlayer from '../components/AudioPlayer';
import CustomCircle from '../components/CustomCircle';
import { keyNumberToLetter, modeNumberToMusicalKey, timeNumberToFraction, msToTime } from '../utils/musicUtils';
import db from '../../firebaseConfig';
import { ref, push, query, orderByChild, equalTo, get } from 'firebase/database';
import { BlurView } from 'expo-blur';


const SongInfoScreen = ({ route }) => {
    const { track, audioFeatures } = route.params;
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const key = `${keyNumberToLetter(audioFeatures.key)} ${modeNumberToMusicalKey(audioFeatures.mode)}`;
    const timeSignature = timeNumberToFraction(audioFeatures.time_signature);
    const tempo = audioFeatures.tempo.toFixed(2);
    const duration = msToTime(audioFeatures.duration_ms);
    const previewUrl = track.preview_url;

    // Initialize an Animated.Value for scroll position
    const scrollY = useRef(new Animated.Value(0)).current;


    const handleOptionsPress = () => {
        setDropdownVisible(true);
    };

    const handleSaveSong = async () => {
        try {
            // Reference to the 'savedSongs' collection
            const savedSongsRef = ref(db, 'savedSongs');

            // Query the database for a song with the same track ID
            const queryRef = query(savedSongsRef, orderByChild('track/id'), equalTo(track.id));
            const snapshot = await get(queryRef);

            if (!snapshot.exists()) {
                // If the song doesn't exist, save it to Firebase
                await push(savedSongsRef, {
                    track,
                    audioFeatures
                });
                console.log('Song saved to Firebase:', track.name);
            } else {
                console.log('Song already exists, not saving duplicate.');
            }
        } catch (error) {
            console.error('Error saving song: ', error);
        }
        setDropdownVisible(false);
    };


    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={[{ zIndex: 1, width: '100%', position: 'absolute', top: 0 }, { backgroundColor: 'transparent' }]}>
                <BlurView
                    intensity={100} 
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                />
                <CustomHeader onOptionsPress={handleOptionsPress} />
            </Animated.View>
            <Animated.ScrollView
                style={{ flex: 1, marginTop: 0 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >

                <View style={styles.container}>

                    <Image
                        source={{ uri: track.album.images[0].url }}
                        style={styles.albumArt}
                    />

                    <View style={styles.trackInfoContainer}>
                        <View style={styles.trackDetails}>
                            <Text style={styles.trackTitle}>{track.name}</Text>
                            <Text style={styles.artistName}>{track.artists.map((artist) => artist.name).join(', ')}</Text>
                        </View>

                        <AudioPlayer previewUrl={previewUrl} />
                    </View>

                    <View style={styles.audioFeaturesGrid}>
                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>Key</Text>
                            <Text style={styles.featureValue}>{key}</Text>
                        </View>

                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>Time Signature</Text>
                            <Text style={styles.featureValue}>{timeSignature}</Text>
                        </View>

                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>Tempo</Text>
                            <Text style={styles.featureValue}>{tempo} BPM</Text>
                        </View>

                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>Duration</Text>
                            <Text style={styles.featureValue}>{duration}</Text>
                        </View>
                    </View>

                    <View style={styles.audioFeaturesCircle}>
                        <CustomCircle title="Energy" value={audioFeatures.energy} />
                        <CustomCircle title="Danceability" value={audioFeatures.danceability} />
                        <CustomCircle title="Instrumentalness" value={audioFeatures.instrumentalness} />
                        <CustomCircle title="Liveness" value={audioFeatures.liveness} />
                        <CustomCircle title="Acousticness" value={audioFeatures.acousticness} />
                        <CustomCircle title="Speechiness" value={audioFeatures.speechiness} />
                    </View>
                </View>
            </Animated.ScrollView>
            <DropdownMenu
                isVisible={isDropdownVisible}
                onClose={() => setDropdownVisible(false)}
                onSave={handleSaveSong}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    fixedHeader: {
        zIndex: 1,
        width: '100%',
        backgroundColor: '#F1F0F0',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#ffffff',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 10,
    },
    albumArt: {
        width: 280,
        height: 280,
        borderRadius: 4,
        resizeMode: 'contain',
        marginTop: 50,
    },
    trackInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    trackDetails: {
        marginRight: 40,
    },
    trackTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: 200,
    },
    artistName: {
        fontSize: 18,
        color: '#313131',
        marginTop: 5,
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: 200,
    },
    audioFeaturesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '90%',
    },
    audioFeaturesCircle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        marginTop: 8,
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
    },
    featureValue: {
        fontSize: 14,
        color: '#FF4801',
        textAlign: 'center',
    },
});

export default SongInfoScreen;
