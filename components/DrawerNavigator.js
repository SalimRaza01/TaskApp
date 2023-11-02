import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import NotifyScreen from './Screens/NotifyScreen';

import Tabs from './Tabs';

const { width } = Dimensions.get('window');

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ route, navigation }) => {

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="AGVA"
        component={Tabs}
        initialParams={{ username: route.params.username, email: route.params.email, token: route.params?.token }}
        options={{
          headerCenter: () => (
            <View>
              <Image
                style={styles.logo}
                source={require('../assets/AgVa.png')}
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
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('NotifyScreen', { token: route.params?.token })} >
              <Image
                style={styles.BellIcon}
                source={require('../assets/bellIcon.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen name="NotifyScreen" component={NotifyScreen} initialParams={{ username: route.params.username, email: route.params.email, token: route.params?.token }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  Menu: {
    width: width * 0.06,
    height: width * 0.06,
  },
  BellIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.04
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
});
