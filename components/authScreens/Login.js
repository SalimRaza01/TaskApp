import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

export default function Login(props) {
  return (
    <View style={styles.container}>

      <View style={{}}>

        <Image style={styles.LoginImage} source={require('../../assets/LoginImage.png')} />
        <Text style={styles.AppName}>TaskApp</Text>
        <Text style={styles.WelcomeText}>Welcome to</Text>
      </View>

      <View style={styles.LoginContainer}>
        <Text style={styles.LoginText}>Login</Text>

        {/* <View style={styles.divider} /> */}

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

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#007BFF" }]}
            onPress={''}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.divider2} />
          <Text style={{ marginTop: height * 0.02 }}>i don't have account!</Text>
          <View style={styles.divider2} />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007BFF" }]}
          onPress={() => props.navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FFFFFF" }]}
          onPress={''}>
        </TouchableOpacity>
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
    marginTop: height * -0.06,
    marginBottom: height * -0.15,
    marginLeft: width * 0.6
  },
  AppName: {
    marginTop: height * -0.15,
    marginBottom: height * -0.01,
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: width * 0.6
  },
  LoginImage: {
    marginLeft: width * 0.05,
    width: width * 0.45,
    height: width * 0.45,
    marginTop: height * 0.04,
  },
  LoginContainer: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: height * 0.3,
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
    textAlign: "left",
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
    borderWidth: 1,
    borderColor: "#ccc",
    padding: width * 0.03,
    marginBottom: height * 0.001,
    borderRadius: width * 1,
    fontSize: width * 0.03,
  },
  button: {
    width: width * 0.9,
    padding: width * 0.040,
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
    height: 0.5,
    width: width * 0.15
  },

})