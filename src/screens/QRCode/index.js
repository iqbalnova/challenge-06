import {View, Text, Alert, TouchableOpacity, Linking} from 'react-native';
import React, {useState} from 'react';
import {CameraScreen, CameraType} from 'react-native-camera-kit';

export default function QRCode() {
  const [qrCode, setQrCode] = useState('');

  if (qrCode) {
    Alert.alert('Result', qrCode, [
      {
        text: 'Go To URL',
        onPress: () => {
          Linking.openURL(qrCode);
          setQrCode('');
        },
      },
      {
        text: 'Cancel',
        onPress: () => setQrCode(''),
      },
    ]);
  }

  return (
    <View>
      <View>
        <CameraScreen
          scanBarcode={true}
          CameraType={CameraType.Back}
          onReadCode={event => {
            setQrCode(event.nativeEvent.codeStringValue);
          }} // optional
          showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
          laserColor="red" // (default red) optional, color of laser in scanner frame
          frameColor="white" //
        />
      </View>
    </View>
  );
}
