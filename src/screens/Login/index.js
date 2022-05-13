import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, Button} from 'react-native-elements';

import {ms} from 'react-native-size-matters';
import SocialButton from '../../components/SocialButton';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from './redux/action';
import FingerprintButton from '../../components/FingerprintButton';
import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {token} = useSelector(state => state.login);
  const dispatch = useDispatch();

  const postLogin = async () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(e => {
        navigation.navigate('Main');

        console.log(e);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('Invalid credentials');
        setLoading(false);
      });
  };

  // if (loading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: '#fff',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <ActivityIndicator size={20} color="red" />
  //     </View>
  //   );
  // }

  const _signIn = async () => {
    try {
      console.log('click');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.idToken);
      dispatch(setToken(userInfo.idToken));
      // this.setState({ userInfo });
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigation.navigate('Main');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#0000',
      }}>
      <View style={{flex: 1, resizeMode: 'contain', justifyContent: 'center'}}>
        <View style={{marginTop: ms(-150)}}>
          <Text
            style={{
              margin: ms(20),
              textAlign: 'center',
              fontSize: ms(50),
              fontWeight: 'bold',
              color: '#5D8BF4',
            }}>
            Sign In
          </Text>
          <View
            style={{
              margin: ms(10),
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Input
              style={{height: ms(50), color: 'black'}}
              label="Username"
              placeholder=" "
              onChangeText={text => setUsername(text)}
            />
            <Input
              style={{height: ms(50), color: 'black'}}
              label="Password"
              placeholder=" "
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: ms(50),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: ms(10),
              marginBottom: ms(10),
              marginHorizontal: ms(10),
              flexDirection: 'row',
            }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={() => postLogin()}
                style={{
                  flex: 4,
                  marginRight: 20,
                  backgroundColor: '#19bdc9',
                  height: 50,
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 20}}>
                  Login
                </Text>
              </TouchableOpacity>
            )}
            <FingerprintButton />
          </View>
          <View style={{margin: 10}}>
            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => _signIn()}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
