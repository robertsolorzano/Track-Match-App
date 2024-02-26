import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const LoudnessBar = ({ loudness, animate }) => {
  const maxLoudnessDb = 0;
  const minLoudnessDb = -60;
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) { // Only start the animation if the 'animate' prop is true
      const targetHeight = ((loudness - minLoudnessDb) / (maxLoudnessDb - minLoudnessDb)) * 100;
      Animated.timing(animatedHeight, {
        toValue: targetHeight,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }
  }, [loudness, animate]); // Depend on 'animate' prop as well

  return (
    <View style={styles.container}>
      <Text style={styles.loudnessLabel}>Loudness (dB)</Text>
      <View style={styles.barContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 30 150" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#00a5ff" />
              <Stop offset="100%" stopColor="#00d5ff" />
            </LinearGradient>
          </Defs>
          <AnimatedRect
            x="0"
            y={animatedHeight.interpolate({
              inputRange: [0, 100],
              outputRange: ['150', '0'] // Adjust for animation direction
            })}
            width="30"
            height={animatedHeight.interpolate({
              inputRange: [0, 100],
              outputRange: ['0', '150'] // Adjust for animated height
            })}
            fill="url(#barGradient)"
          />
        </Svg>
      </View>
      <Text style={styles.loudnessValue}>{`${loudness} dB`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  barContainer: {
    width: 40, // Adjusted for visibility
    height: 180, // Make sure this matches your design needs
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  loudnessLabel: {
    fontWeight: 'bold',
    fontSize: 22,
    marginRight: 20,
  },
  loudnessValue: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default LoudnessBar;
