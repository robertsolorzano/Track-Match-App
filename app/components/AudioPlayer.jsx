// AudioPlayer.js
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons'; // For play/pause icons
import Slider from '@react-native-community/slider';

const AudioPlayer = ({ previewUrl }) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    const togglePlayback = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        } else {
            const { sound: newSound, status } = await Audio.Sound.createAsync(
                { uri: previewUrl },
                { shouldPlay: true }
            );
            setSound(newSound);
            setIsPlaying(true);
            setDuration(status.durationMillis);
            newSound.setOnPlaybackStatusUpdate(updateStatus);
        }
    };

    const updateStatus = (status) => {
        setProgress(status.positionMillis);
        if (status.didJustFinish) {
            setIsPlaying(false);
            setProgress(0);
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
                onValueChange={(value) => {
                    if (sound) {
                        sound.setPositionAsync(value);
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
