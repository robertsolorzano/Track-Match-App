// LibraryStackNavigator.jsx
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
      // You can add more screens here that should be part of the Library navigation stack
    </Stack.Navigator>
  );
};

export default LibraryStackNavigator;
