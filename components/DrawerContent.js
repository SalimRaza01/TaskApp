import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const DrawerContent = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Settings');
        }}
      >
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;
