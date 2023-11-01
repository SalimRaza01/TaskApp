import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';

import Tabs from './Tabs'; 

const { width } = Dimensions.get('window');

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({route, navigation}) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="AGVA" component={Tabs} initialParams={{ username: route.params.username, email: route.params.email }} 
       />
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
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
});


// options={{
//   headerLeft: () => (
//     <TouchableOpacity onPress={() => navigation.navigate('DrawerContent')}>
//       <Image
//         style={styles.Menu}
//         source={require('../assets/menu.png')}
//       />
//     </TouchableOpacity>
//   ),
//   headerCenter: () => (
//     <View>
//       <Image
//         style={styles.logo}
//         source={require('../assets/AgVa.png')}
//       />
//     </View>
//   ),
//   headerTitle: 'AgVa',
//   headerTitleAlign: 'center',
//   headerTitleStyle: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: '#cb297b',
//   },
//   headerRight: ({ navigation }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('NotifyScreen')}>
//       <Image
//         style={styles.BellIcon}
//         source={require('../assets/bellIcon.png')}
//       />
//     </TouchableOpacity>
//   ),
// }}