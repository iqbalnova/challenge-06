import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapDarkStyle, mapRetro, mapStandardStyle} from '../../helpers/mapstyle';

Geolocation.setRNConfiguration({
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 10000,
});

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

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      setPos({
        lat: info.coords.latitude,
        long: info.coords.longitude,
      });
    });
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
