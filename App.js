import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import SplashScreen from './components/Screens/SplashScreen';
import Profile from './components/Screens/Profile';
import TaskDetails from './components/TaskDetails';
import Settings from './components/Screens/Settings';
import TaskModal from './components/TaskModal';
import HomeScreen from './components/Screens/HomeScreen';
import NotifyScreen from './components/Screens/NotifyScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './components/DrawerNavigator';
import DrawerContent from './components/DrawerContent';
import Login from './components/authScreens/Login';

const { width } = Dimensions.get('window');

const Stack = createNativeStackNavigator();
export default function App() {
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const stayLoggedIn = await AsyncStorage.getItem('stayLoggedIn');

      if (authToken && stayLoggedIn === 'true') {
        const userId = await AsyncStorage.getItem('userId');
        // You can navigate to the Drawer or any other screen as needed
        // Example: navigation.navigate('Drawer', { userId });
      } else {
        // Navigate to the Login screen or any other screen as needed
        // Example: navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            position: 'absolute',
            top: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            height: 90,
          },
        }}
      >
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="DrawerContent" component={DrawerContent} />
        <Stack.Screen options={{ headerShown: false }} name="NotifyScreen" component={NotifyScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="TaskModal" component={TaskModal} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  Menu: {
    width: width * 0.06,
    height: width * 0.06,
  },
  BellIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
});
