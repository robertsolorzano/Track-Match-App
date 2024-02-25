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
        headerShown: false, 
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'gray', 
        }}
      />
      <Tab.Screen
        name="Search"
        component={MainScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white', // Set your preferred background color
          },
          headerTintColor: 'gray', // Set your preferred text color
        }}
      />
      {/* <Tab.Screen name="My Songs" component={MySongsScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
