import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

let currentSound = null; // Global variable to track the current sound object

const AudioPlayer = ({ previewUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        return () => {
            // Ensure the sound is unloaded when the component unmounts
            if (currentSound) {
                currentSound.unloadAsync();
            }
        };
    }, []);

    const togglePlayback = async () => {
        if (currentSound) {
            await currentSound.unloadAsync();
            currentSound = null;
            setIsPlaying(false);
        }

        if (!isPlaying) {
            const { sound, status } = await Audio.Sound.createAsync(
                { uri: previewUrl },
                { shouldPlay: true }
            );
            currentSound = sound;
            setIsPlaying(true);
            setDuration(status.durationMillis);
            sound.setOnPlaybackStatusUpdate(updateStatus);
        } else if (isPlaying && currentSound) {
            await currentSound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const updateStatus = (status) => {
        setProgress(status.positionMillis);
        if (status.didJustFinish) {
            setIsPlaying(false);
            setProgress(0);
            if (currentSound) {
                currentSound.unloadAsync();
                currentSound = null;
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={togglePlayback}>
                <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={24} color="black" />
            </TouchableOpacity>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={progress}
                onValueChange={async (value) => {
                    if (currentSound) {
                        await currentSound.setPositionAsync(value);
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider: {
        flex: 1,
        marginLeft: 20,
    },
});

export default AudioPlayer;
