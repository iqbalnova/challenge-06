import {View, Text, Alert} from 'react-native';
import React from 'react';
import TouchID from 'react-native-touch-id';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function FingerprintButton() {
  const navigation = useNavigation();
  const optionalConfigObject = {
    title: 'Authentication Required',
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch Sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
  };

  const isSupport = () => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
        }
      })
      .catch(error => {
        // Failure code
        Alert.alert(
          'Error',
          'Maaf HP anda tidak support Biometric Authentication',
        );
      });
  };

  const btnAuth = () => {
    TouchID.authenticate('', optionalConfigObject)
      .then(() => {
        navigation.navigate('Main');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          isSupport(), btnAuth();
        }}
        style={{backgroundColor: '#19bdc9', width: 50, borderRadius: 10}}>
        <MaterialIcons name="fingerprint" size={50} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
