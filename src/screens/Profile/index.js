import {View, Text, Alert} from 'react-native';
import React from 'react';
import {setToken} from '../Login/redux/action';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ms} from 'react-native-size-matters';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Crashlytics from '@react-native-firebase/crashlytics';
import auth from '@react-native-firebase/auth';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.login);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();

      dispatch(setToken());
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
        console.log('out');
      });
  };

  const allLogout = () => {
    if (token) {
      signOut();
    } else {
      logOut();
    }
  };

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Logout', 'Apakah anda yakin untuk logout ?', [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {
              text: 'OK',
              onPress: () => {
                allLogout();
                signOut();
              },
            },
          ])
        }
        style={{
          backgroundColor: 'red',
          height: ms(50),
          alignItems: 'center',
          justifyContent: 'center',
          width: ms(200),
          borderRadius: ms(30),
          marginBottom: ms(20),
        }}>
        <Text style={{color: '#fff', fontSize: ms(15)}}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          height: ms(50),
          alignItems: 'center',
          justifyContent: 'center',
          width: ms(200),
          borderRadius: ms(30),
          marginBottom: ms(20),
        }}
        onPress={() => checkToken()}>
        <Text style={{color: '#fff', fontSize: ms(15)}}>Get Token</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          height: ms(50),
          alignItems: 'center',
          justifyContent: 'center',
          width: ms(200),
          borderRadius: ms(30),
        }}
        onPress={() => Crashlytics().crash()}>
        <Text style={{color: '#fff', fontSize: ms(15)}}>Crashlytycs</Text>
      </TouchableOpacity>
    </View>
  );
}
