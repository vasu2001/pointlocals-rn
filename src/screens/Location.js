import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {PRIMARY} from '../utils/colors';
import {boxStyle} from '../utils/styles';
import {useDispatch} from 'react-redux';
import {startLoading, stopLoading} from '../utils/reduxHelpers';
import {addLocation} from '../redux/actions/core';

//distanceDelta = Math.exp(Math.log(360) - (zoom * Math.LN2));
const initialCoor = {latitude: 17.385, longitude: 78.4867};

const Location = ({navigation}) => {
  const [accuracy, setAccuracy] = useState(-1);
  const [location, setLocation] = useState({
    address: '',
    pinCode: '',
    latitude: '',
    longitude: '',
  });
  const [mapLocation, setMapLocation] = useState({...initialCoor, heading: 0});
  // weird bug with map- requires a style update for showing zoom controls
  const [mapHeight, setMapHeight] = useState(200);

  const mapRef = useRef();
  const dispatch = useDispatch();

  const setLocationField = (field) => (value) =>
    setLocation({
      ...location,
      [field]: value,
    });

  const getCurrentLocation = async () => {
    dispatch(startLoading);

    try {
      await PermissionsAndroid.requestMultiple([
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.ACCESS_WIFI_STATE',
      ]);

      navigator.geolocation.getCurrentPosition(
        (res) => {
          // console.log(res);
          const {accuracy, longitude, latitude, heading} = res.coords;

          setAccuracy(Math.round((accuracy + Number.EPSILON) * 10) / 10);
          setLocation({
            ...location,
            longitude,
            latitude,
          });
          setMapLocation({longitude, latitude, heading});
          mapRef.current?.animateCamera({center: {longitude, latitude}});

          dispatch(stopLoading);
        },
        (err) => {
          console.log(err);
          dispatch(stopLoading);
          Alert.alert('Error getting location, check if location is enabled');
        },
        {
          timeout: 5000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        },
      );
    } catch (err) {
      console.log(err);
      dispatch(stopLoading);
    }
  };

  const onNext = () => {
    if (!location.latitude) {
      Alert.alert('Use Copy Geolocation Button to update the location');
    } else if (!location.address) {
      Alert.alert('Enter address');
    } else
      dispatch(
        addLocation(location, () => {
          navigation.navigate('Details');
        }),
      );
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={boxStyle}>
        <MapView
          ref={mapRef}
          initialRegion={{
            ...initialCoor,
            latitudeDelta: 0.005493164062500003,
            longitudeDelta: 0.005493164062500003,
          }}
          showsCompass
          zoomControlEnabled
          onMapReady={() => setMapHeight(201)}
          style={[styles.map, {height: mapHeight}]}>
          <Marker.Animated
            draggable
            // flat={true}
            coordinate={mapLocation}
            anchor={{x: 0.5, y: 1}}
            style={{
              transform: [
                {
                  rotateZ: `${mapLocation.heading}deg`,
                },
              ],
            }}
            onDragEnd={(e) => {
              console.log(e.nativeEvent.coordinate);
              setLocation({...location, ...e.nativeEvent.coordinate});
            }}>
            <Ionicons
              name="location-sharp"
              size={40}
              color={PRIMARY}
              // style={{transform: [{rotateZ: '315deg'}]}}
              style={{opacity: 0.75}}
            />
          </Marker.Animated>
        </MapView>

        <Text style={styles.text}>
          Select a point in the map or enter manually below.
        </Text>

        <CustomInput
          value={location.address}
          setValue={setLocationField('address')}
          placeholder="Address*"
          label="Address*"
          numberOfLines={3}
          icon={locationIcon}
        />

        <CustomInput
          value={location.pinCode}
          setValue={setLocationField('pinCode')}
          placeholder="Pin Code (Post Code)"
          label="Pin Code (Post Code)"
          keyboardType="number-pad"
          icon={
            <Ionicons
              name="md-ellipsis-horizontal-sharp"
              color={PRIMARY}
              size={18}
              style={{marginHorizontal: 5}}
            />
          }
        />
        <Text style={styles.locationAcc}>
          Location Accuracy: {accuracy > 0 && accuracy + ' m'}
        </Text>

        <CustomButton text="Copy Geolocation" onPress={getCurrentLocation} />
        <View style={styles.locRow} pointerEvents="none">
          <CustomInput
            value={location.latitude.toString()}
            setValue={setLocationField('latitude')}
            placeholder="Lat*"
            label="Lat*"
            style={styles.locInput}
            icon={locationIcon}
          />
          <CustomInput
            value={location.longitude.toString()}
            setValue={setLocationField('longitude')}
            placeholder="Long*"
            label="Long*"
            style={styles.locInput}
            icon={locationIcon}
          />
        </View>
      </View>

      <View style={styles.bottom}>
        <CustomButton text="Previous" onPress={() => navigation.goBack()} />
        <CustomButton text="Next" style={styles.next} onPress={onNext} />
      </View>
    </ScrollView>
  );
};

const locationIcon = (
  <SimpleLineIcons
    name="location-pin"
    color={PRIMARY}
    size={18}
    style={{marginHorizontal: 5}}
  />
);

const styles = StyleSheet.create({
  main: {
    padding: 15,
  },
  text: {
    fontSize: 14,
  },
  locationAcc: {
    alignSelf: 'center',
    marginTop: -5,
    marginBottom: 15,
  },

  locRow: {
    flexDirection: 'row',
    paddingHorizontal: -5,
    marginTop: 10,
  },
  locInput: {
    flex: 1,
    marginHorizontal: 5,
  },

  map: {
    width: '100%',
    backgroundColor: 'lightgray',
    marginBottom: 5,
  },

  bottom: {
    marginTop: 25,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  next: {
    marginLeft: 10,
  },
});

export default Location;
