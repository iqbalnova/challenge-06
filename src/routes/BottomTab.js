import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';

import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import QRCode from '../screens/QRCode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../screens/Profile';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#5a5e64"
      inactiveColor="#fff"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 30,
          right: 30,
          elevation: 2,
          backgroundColor: '#fff',
          borderRadius: 25,
          height: 60,
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => {
            return <Feather name="home" size={30} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="QR"
        component={QRCode}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  marginTop: -50,
                  borderRadius: 20,
                  elevation: 1,
                }}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={40}
                  color={color}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => {
            return <Feather name="user" size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
