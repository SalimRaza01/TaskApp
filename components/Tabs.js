import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import TaskModal from './TaskModal';
import HomeScreen from './Screens/HomeScreen';
import Profile from './Screens/Profile';
import Settings from './Screens/Settings';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const CustonTabBarButton = ({ children, toggleModal }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow,
            }}
            onPress={() => toggleModal(true)}>
            <View
                style={{
                    width: width * 0.16,
                    height: width * 0.16,
                    borderRadius: 35,
                    backgroundColor: '#000000',
                    ...styles.shadow
                }}
            >
                {children}
            </View>
        </TouchableOpacity>
    );
};

const Tabs = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');

    const toggleModal = (open) => {
        setModalVisible(open);
    };
  
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 15,
                    height: 75,
                    ...styles.shadow
                }
            }}
            tabBarOptions={{
                activeTintColor: 'rgb(0, 123, 255)',
                inactiveTintColor: 'black',
            }}
            tabBarLabelStyle={{ display: 'none' }}
            screenListeners={({ navigation, route }) => ({
                tabPress: e => {
                    setActiveTab(route.name);
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} initialParams={{ username: route.params.username }} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            style={{
                                width: width * 0.06,
                                height: width * 0.06,
                                tintColor: focused ? 'rgb(0, 123, 255)' : 'black',
                            }}
                            source={require('../assets/Home.png')}
                        />
                    </View>
                )
            }} />
            <Tab.Screen name="Profile" component={Profile} initialParams={{ username: route.params.username}} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            style={{
                                width: width * 0.06,
                                height: width * 0.06,
                                tintColor: focused ? 'rgb(0, 123, 255)' : 'black',
                            }}
                            source={require('../assets/ProfileIcon.png')}
                        />
                    </View>
                )
            }} />
            <Tab.Screen name="Add Task" component={TaskModal} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        style={{
                            width: width * 0.06,
                            height: width * 0.06,
                            tintColor: '#FFFFF',
                        }}
                        source={require('../assets/addtaskwhite.png')}
                    />
                ),
                tabBarButton: (props) => (
                    <CustonTabBarButton {...props} toggleModal={toggleModal} />
                )
            }} />
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            style={{
                                width: width * 0.06,
                                height: width * 0.06,
                                tintColor: focused ? 'rgb(0, 123, 255)' : 'black',
                            }}
                            source={require('../assets/Setting.png')}
                        />
                    </View>
                )
            }} />
            <Tab.Screen name="Logout" component={''} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            style={{
                                width: width * 0.06,
                                height: width * 0.06,
                                tintColor: focused ? 'rgb(0, 123, 255)' : 'black',
                            }}
                            source={require('../assets/bellIcon.png')}
                        />
                    </View>
                )
            }} />
        </Tab.Navigator>
    );
};

export default Tabs;


const styles = StyleSheet.create({
    shadow: {
        shadowOffset: {
            width: width * 0,
            height: height * 1,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.5,
        elevation: 5
    },
})
