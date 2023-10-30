import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

export default function Login(props) {
  return (
    <View style={styles.container}>

      <View >
        {/* <Image style={styles.LoginImage} source={require('../../assets/LoginImage.png')} /> */}
        <Text style={styles.WelcomeText}>Welcome to</Text>
        <Text style={styles.AppName}>TaskApp</Text>
      </View>

      <View style={styles.LoginContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.LoginText}>Sign Up</Text>

        {/* <View style={styles.divider} /> */}
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
          placeholderTextColor="#999"
          placeholder="Name" />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
          placeholderTextColor="#999"
          placeholder="Email" />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
          placeholder="Password"
          placeholderTextColor="#999" />
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
          placeholder="Confirm Password"
          placeholderTextColor="#999" />

        <View style={{ alignContent: "center", alignItems: "center" }}>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#007BFF" }]}
            onPress={''}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

          <View style={styles.divider2} />
          <Text style={{ marginTop: height * 0.02 }}>Already have account!</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ marginTop: height * 0.02, color: "#007BFF"}} >Login</Text>
          </TouchableOpacity>
          <View style={styles.divider2} />
        </View>

        <View style={{ alignContent: "center", alignItems: "center" }}>
          {/* <TouchableOpacity
            style={[styles.button, { backgroundColor: "#007BFF" }]}
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FFFFFF" }]}
            onPress={''}>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007BFF",
  },
  WelcomeText: {
    fontSize: width * 0.03,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: height * 0.03,
    marginLeft: width * 0.1
  },
  AppName: {
    marginTop: height * -0.005,
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: width * 0.1
  },
  LoginImage: {
    marginLeft: width * 0.05,
    width: width * 0.3,
    height: width * 0.3,
    marginTop: height * 0.001,
  },
  LoginContainer: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: height * 0.025,
    height: height * 1,
    width: width * 1,
    backgroundColor: "#FFFFFF",
  },
  LoginText: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    marginTop: height * 0.001,
    marginBottom: width * -0.001,
    color: "#333",
    marginLeft : width * 0.05
  },
  inputLabel: {
    fontSize: width * 0.03,
    marginTop: height * 0.025,
    marginBottom: 9,
    color: "#333",
    textAlign: "left",
    marginLeft: width * 0.045,
  },
  input: {
    marginLeft: width * 0.04,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: width * 0.02,
    marginBottom: height * 0.001,
    borderRadius: width * 0.02,
    fontSize: width * 0.03,
    width: width * 0.8
  },
  button: {
    width: width * 0.5,
    padding: width * 0.030,
    borderRadius: width * 1,
    marginTop: height * 0.03,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  divider: {
    marginTop: height * 0.04,
    backgroundColor: "#000000",
    height: 1,
  },
  divider2: {
    marginTop: height * 0.035,
    backgroundColor: "#000000",
    height: 0.6,
    width: width * 0.2
  },

})