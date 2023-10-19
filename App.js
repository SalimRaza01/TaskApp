import React from 'react';
import SplashScreen from './components/SplashScreen';
import TaskScreen from './components/HomeScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="TaskScreen" component={TaskScreen} />
    
      
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}