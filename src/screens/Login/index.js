import {Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from 'react-native-elements';

import {ms} from 'react-native-size-matters';
import SocialButton from '../../components/SocialButton';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const postLogin = async () => {
    // if(username.length < 1){
    //   alert('Username tidak boleh kosong');
    // }
    // else if(password.length < 1 ){
    //   alert('Password tidak boleh kosong');
    // } else {
    //   try {
    //     setLoading(true);
    //     const body = {
    //       username: username, // mor_2314
    //       password: password, // 83r5^_
    //     };
    //     const res = await axios.post(`${BaseUrlApi}/auth/login`, body, {
    //       validateStatus: status => status < 501});
    //     console.log(res);
    //     if(res.status <= 201){
    //       navigation.navigate("Main")
    //     } else {
    //       alert("Username atau password Salah")
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally{
    //     setLoading(false);
    //   }
    // }
  };

  // if(loading){
  //   return(
  //     <View style={{ flex:1,backgroundColor:'#fff', justifyContent:'center', alignItems:'center' }}>
  //       <LottieView style={{ flex:1 }} source={require('../../helpers/loadingMovie.json')} autoPlay loop />
  //     </View>
  //   )
  // }

  const _signIn = async () => {
    try {
      console.log('click');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);

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
              style={{height: ms(50), color: 'white'}}
              label="Username"
              placeholder=" "
              onChangeText={text => setUsername(text)}
            />
            <Input
              style={{height: ms(50), color: 'white'}}
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
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: ms(11),
                  marginTop: ms(5),
                  marginBottom: ms(25),
                }}>
                Forget Password?
              </Text>
            </TouchableOpacity>
            <Button onPress={postLogin} title={'Sign in'} />
            <TouchableOpacity
              style={{marginVertical: ms(10)}}
              onPress={() => navigation.navigate('Register')}>
              <Text style={{color: 'white'}}>SignUp</Text>
            </TouchableOpacity>
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