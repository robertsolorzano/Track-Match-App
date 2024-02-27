import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from '../screens/LibraryScreen';
import SongInfoScreen from '../screens/SongInfoScreen';
// Correctly import these from react-native
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Stack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LibraryHome"
        component={LibraryScreen}
        options={{
          headerShown: true,
          headerTitle: "Library",
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => console.log('Settings pressed!')} style={styles.iconButton}>
                <Ionicons name="settings-outline" size={24} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Logo pressed!')} style={styles.LogoButton}>
                <Ionicons name="ellipse" size={44} color="grey" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="SongInfoScreen" component={SongInfoScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    marginRight: 0,
  },
  iconButton: {
    marginRight: 10,
    alignSelf: 'center',
  },
  LogoButton: {
    marginRight: 10,
  },
});

export default LibraryStackNavigator;
