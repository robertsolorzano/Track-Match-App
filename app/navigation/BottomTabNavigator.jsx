import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Homescreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
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
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
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
        component={SearchScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white', 
          },
          headerTintColor: 'gray', 
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'gray',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
