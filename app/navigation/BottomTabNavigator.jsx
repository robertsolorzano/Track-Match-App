import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Homescreen';
import MainScreen from '../screens/MainScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide the header globally within the bottom tab navigator
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#403e44', // Set your preferred background color
          },
          headerTintColor: '403e44', // Set your preferred text color
        }}
      />
      <Tab.Screen
        name="Search"
        component={MainScreen}
        options={{
          headerStyle: {
            backgroundColor: '403e44', // Set your preferred background color
          },
          headerTintColor: '403e44', // Set your preferred text color
        }}
      />
      {/* <Tab.Screen name="My Songs" component={MySongsScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
