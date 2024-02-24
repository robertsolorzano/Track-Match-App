// HomeScreen.jsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Main Screen"
        onPress={() => navigation.navigate('MainScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#403e44',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
