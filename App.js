import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from './app/Homescreen';
import mainScreen from './app/MainScreen'; 




const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="MainScreen" component={mainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
