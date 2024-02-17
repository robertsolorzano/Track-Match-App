// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Homescreen';
import MainScreen from '../screens/MainScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MainScreen" component={MainScreen} />
      {/* Add my songs tab later */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
