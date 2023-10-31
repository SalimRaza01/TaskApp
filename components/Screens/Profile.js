import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Profile({ route }) {
  const navigation = useNavigation();
  const { username, email } = route.params;
  
  const [profileImage, setProfileImage] = useState(''); 

  const handleUpdateProfile = () => {

  }

  return (
    <View style={styles.container}>

      <View style={styles.ProfileContainer}>
      <Image style={styles.profileImage} source={require('../../assets/profile.png')} />
      <TouchableOpacity  onPress={() => handleUpdateProfile()}>
      <Image style={styles.UpdateImage} source={require('../../assets/addImage.png')} />
      </TouchableOpacity>
      <Text style={styles.UserName}>{username}</Text>

      <Text style={styles.UserEmail}>{email}</Text>
  
      <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdateProfile()}>
        <Text style={styles.updateButtonText}  >Update Profile</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"center",
    // backgroundColor: "#FFFFFF",
  },
  ProfileContainer: {
    width: width * 0.8,
    height: width * 1,
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: "#FFFFFF",
    borderRadius: width * 0.03,
    elevation: 5,
  },
  profileImage: {
    width: width * 0.35,
    height: width * 0.35,
    marginTop: height * 0.001,
  },

  UpdateImage: {
    marginLeft: width * 0.2,
    width: width * 0.07,
    height: width * 0.07,
    marginTop: height * -0.025,
    borderColor:"black"
  },

  updateButton: {
    color: "#FFFFFF",
    backgroundColor: "#007BFF",
    width: width * 0.4,
    padding: width * 0.030,
    borderRadius: width * 1,
    marginTop: height * 0.06,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: width * 0.03,
    fontWeight: "bold",
    alignItems: "center",
  },
  UserName: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginTop: height * 0.015,
    marginBottom: -10,
    color: "#333",
    textAlign: "left",
  },
  UserEmail: {
    fontSize: width * 0.025,
    fontWeight: "bold",
    marginTop: height * 0.02,
    marginBottom: -10,
    color: "#333",
    textAlign: "left",
  },

});
