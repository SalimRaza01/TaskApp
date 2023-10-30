import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
import React from 'react'

const { width, height } = Dimensions.get('window');

export default function NotifyScreen(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View>
            <Text style={styles.Header}>
                Notificaiton
            </Text>
            <TouchableOpacity style={styles.mybtn} onPress={() => props.navigation.navigate('TabBar')} >
                
            </TouchableOpacity>
            <TouchableOpacity style={styles.mybtn2} onPress={() => props.navigation.navigate('')}>
            
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.textbox}>
        
          
                    <Text style={styles.NotifyTitle}>
                        Hey, it's time for lunch
                    </Text>
                    <Text style={styles.Timing}>
                        About 1 minutes ago
                    </Text>
                </View>
                <Text style={{ textAlign: 'center', marginTop: 1, color: '#DDDADA' }}>
                    ____________________________________________________
                </Text>
            </TouchableOpacity>

        </View>
      {/* <TouchableOpacity style={styles.BackBtn} onPress={() => props.navigation.navigate('Tabs')} >
        <Image style={styles.BackIcon} source={require('../../assets/BackBtn.png')} />
      </TouchableOpacity>

      <View style={{ flexDirection: "column", alignItems: "center", marginTop: height * 0.02 }}>
        <TouchableOpacity style={styles.NotifyComponent}>
          <Text>Task Reminder for AgVa Pro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.NotifyComponent}>
          <Text>Task Reminder for AgVa Pro</Text>
        </TouchableOpacity>
      </View> */}

    </View>
  )
}

const styles = StyleSheet.create({

  textbox: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "C8C8DC",
    // borderRadius: width * 0.02,
    // elevation: 2,
    marginLeft: width * 0.07,
    marginTop: height * 0.015,
    width: width * 0.85,
    height: height * 0.075,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  BackBtn: {
    backgroundColor: "#FFFFFF",
    width: width * 0.1,
    height: height * 0.05,
    borderRadius: width * 1,
    marginTop: height * 0.05,
    marginLeft: width * 0.05,
    alignItems: "center",
    justifyContent: "center"

  },
  BackIcon: {
    marginLeft: width * 0.001,
    width: width * 0.07,
    height: width * 0.07,
    // marginTop: height * -0.01,

  }
})