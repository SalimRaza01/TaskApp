import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from "./HomeScreen";
import NotifyScreen from "./Screens/NotifyScreen";

export default function Drawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotifyScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}