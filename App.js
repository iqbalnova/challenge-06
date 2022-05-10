import {View, Text, Button, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import Root from './src/routes/Root';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '680450186778-d1blq8siqc6r8p3mpd65po8t3jdlr7gv.apps.googleusercontent.com',
});

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(await messaging().getToken());
    });

    return unsubscribe;
  }, []);
  return (
    <Root />
    // <View>
    //   <Button title="Test Crash" onPress={() => Crashlytics().crash()} />
    //   <TouchableOpacity
    //     onPress={async () => {
    //       console.log('token : ', await messaging().getToken());
    //     }}>
    //     <Text>Token</Text>
    //   </TouchableOpacity>
    // </View>
  );
}
