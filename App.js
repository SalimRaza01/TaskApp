import React, { useEffect } from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';
import SplashScreen from './components/SplashScreen';
import Profile from './components/Profile';
import TaskDetails from './components/TaskDetails';
import Settings from './components/Settings';
import TaskModal from './components/TaskModal';
import Login from './components/authScreens/Login';
import HomeScreen from './components/HomeScreen';
import NotifyScreen from './components/Screens/NotifyScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Tabs from './components/Tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken !== null) {

      } else {

      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: true, headerStyle: {
          position: 'absolute',
          top: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#FFFFFF',
          borderRadius: 15,
          height: 90
        }
      }} >
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="NotifyScreen" component={NotifyScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />

        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerLeft: () => (
              <TouchableOpacity>
                <Image
                  style={styles.Menu}
                  source={require('./assets/menu.png')}
                />
              </TouchableOpacity>
            ),
            headerCenter: () => (
              <View>
                <Image
                  style={styles.logo}
                  source={require('./assets/AgVa.png')}
                />
              </View>
            ),
            headerTitle: 'AgVa',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
              color: '#cb297b',
            },
            headerRight: ({ navigation }) => (
              <TouchableOpacity onPress={() => navigation.navigate('NotifyScreen')}>
                <Image
                  style={styles.BellIcon}
                  source={require('./assets/bellIcon.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="TaskModal" component={TaskModal} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} options={{
          headerCenter: () => (
            <View>
              <Image
                style={styles.logo}
                source={require('./assets/AgVa.png')}
              />
            </View>
          ),
          headerTitle: 'Task Details',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#cb297b',
          },
        }} />
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
