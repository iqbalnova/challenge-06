import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';

import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import QRCode from '../screens/QRCode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="grey"
      screenOptions={{headerShown: false}}
      barStyle={{backgroundColor: '#694fad'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => {
            return <Feather name="home" size={20} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="QR"
        component={QRCode}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={20}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;