// CustomCircle.jsx
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Svg, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';


const CustomCircle = ({ title, value }) => {
  const size = 60;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Use Animated.Value for animating properties
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    // Animate the stroke dash offset from full circumference to the correct value
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Listen to changes in animatedValue to set the strokeDashoffset
    animatedValue.addListener((v) => {
      const offset = circumference - circumference * v.value;
      setStrokeDashoffset(offset);
    });

    // Cleanup the listener
    return () => animatedValue.removeAllListeners();
  }, [value, circumference, animatedValue]);

  return (
<View style={styles.circleContainer}>
  <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <Defs>
      <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#00a5ff" />
        <Stop offset="100%" stopColor="#00d5ff" />
      </LinearGradient>
    </Defs>
    <Circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      stroke="url(#grad)" 
      strokeWidth={strokeWidth}
      strokeDasharray={`${circumference} ${circumference}`}
      strokeDashoffset={strokeDashoffset}
      transform={`rotate(-90 ${size / 2} ${size / 2})`}
    />
  </Svg>
  <Text style={{ marginTop: 5 }}>{title}</Text>
</View>

  );
};

export default CustomCircle;

const styles = StyleSheet.create({
  circleContainer: {
    width: 120,
    alignItems: 'center',
    margin: 10,
    marginTop: 0,
  },
});
