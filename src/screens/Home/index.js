import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {mapDarkStyle, mapRetro, mapStandardStyle} from '../../helpers/mapstyle';

const Home = () => {
  const [pos, setPos] = useState({});
  const [pin, setPin] = useState({
    latitude: -7.79285075950564,
    longitude: 110.36558090019608,
  });
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const requestPermissions = React.useCallback(async () => {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    console.log(result);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        const resRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        console.log(resRequest);
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        getCurrentLoc();
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  }, []);

  const getCurrentLoc = () => {
    Geolocation.getCurrentPosition(
      position => {
        setPos({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        // fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          // setRegion({
          //   latitude: details.geometry.location.lat,
          //   longitude: details.geometry.location.lng,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // });
        }}
        query={{
          key: 'AIzaSyDsUahpMgwXxH9f4uaChUR9Se-VmvZx1Yk',
          language: 'en',
        }}
        styles={{
          container: {flex: 0, position: 'absolute', width: '100%', zIndex: 1},
          listView: {backgroundColor: '#fff'},
        }}
      />
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: pos.lat ?? -7.79285075950564,
            longitude: pos.long ?? 110.36558090019608,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          customMapStyle={mapRetro}>
          <Marker
            draggable={true}
            coordinate={pin}
            pinColor="red"
            onDragStart={e => {
              console.log('Drag Start', e.nativeEvent.coordinates);
            }}
            onDragEnd={e =>
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
            }>
            <Callout>
              <Text>My Favourite Restaurant</Text>
            </Callout>
          </Marker>
          {/* <Marker
            coordinate={{
              latitude: region.latitude ?? 0,
              longtitude: region.longitude ?? 0,
            }}
          /> */}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
