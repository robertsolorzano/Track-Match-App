// BottomTabNavigator.jsx
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Homescreen';
import LibraryScreen from '../screens/LibraryScreen';
import SearchStackNavigator from './SearchStackNavigator';
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: "Home",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
        }}
      />
<Tab.Screen
  name="Library"
  component={LibraryScreen}
  options={{
    headerShown: true,
    headerTitle: "Library",
    headerRight: () => (
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => console.log('Settings pressed!')} style={styles.iconButton}>
          <Ionicons name="settings" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Logo pressed!')} style={styles.LogoButton}>
          {/* Replace the image with a circular icon */}
          <Ionicons name="ellipse" size={44} color="grey" />
        </TouchableOpacity>
      </View>
    ),
  }}
/>

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    marginRight: 0,
  },
  iconButton: {
    marginRight: 20,
    alignSelf: 'center',

  },
  LogoButton: {
    marginRight: 10,
  },
});

export default BottomTabNavigator;
