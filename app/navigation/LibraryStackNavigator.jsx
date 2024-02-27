// LibraryStackNavigator.jsx might implement later 
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from '../screens/LibraryScreen';

const Stack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Library" component={LibraryScreen} />
    </Stack.Navigator>
  );
};

export default LibraryStackNavigator;
