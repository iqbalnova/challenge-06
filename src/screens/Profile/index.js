import {View, Text, Alert} from 'react-native';
import React from 'react';
import {setToken} from '../Login/redux/action';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ms} from 'react-native-size-matters';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();

      dispatch(setToken());
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Logout', 'Apakah anda yakin untuk logout ?', [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'OK', onPress: () => signOut()},
          ])
        }
        style={{
          backgroundColor: 'red',
          height: ms(50),
          alignItems: 'center',
          justifyContent: 'center',
          width: ms(200),
          borderRadius: ms(30),
        }}>
        <Text style={{color: '#fff', fontSize: ms(15)}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
