import React, {useState, useRef, useEffect} from 'react';
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
import RNLocation from 'react-native-location';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {PRIMARY} from '../utils/colors';
import {boxStyle} from '../utils/styles';
import {useDispatch} from 'react-redux';
import {addLocation} from '../redux/actions/core';

const initialCoor = {latitude: 17.385, longitude: 78.4867};

const Location = ({navigation}) => {
  const [accuracy, setAccuracy] = useState(Infinity);
  const [location, setLocation] = useState({
    address: '',
    pinCode: '',
    latitude: '17.385',
    longitude: '78.4867',
    heading: '',
  });
  // weird bug with map- requires a style update for showing zoom controls
  const [mapHeight, setMapHeight] = useState(200);
  const [blinkOpacity, setBlinkOpacity] = useState(1);

  const mapRef = useRef();
  const blinkRef = useRef(0);
  const dispatch = useDispatch();

  const setLocationField = (field) => (value) =>
    setLocation({
      ...location,
      [field]: value,
    });

  const startBlinking = () => {
    const interval = setInterval(() => {
      // console.log(blinkRef.current);
      if (blinkRef.current === 4) {
        blinkRef.current = 0;
        clearInterval(interval);
      } else {
        setBlinkOpacity((o) => (o ? 0 : 1));
        blinkRef.current++;
      }
    }, 250);
  };

  const onNext = () => {
    if (accuracy > 10) {
      startBlinking();
    } else if (!location.address) {
      navigator.alert('Enter address');
    } else {
      dispatch(
        addLocation(location, () => {
          navigation.navigate('Details');
        }),
      );
    }
  };

  useEffect(() => {
    let unsubscribeLocation;

    PermissionsAndroid.requestMultiple([
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_WIFI_STATE',
    ]).then(() => {
      unsubscribeLocation = RNLocation.subscribeToLocationUpdates((res) => {
        // console.log(res);
        const {accuracy, longitude, latitude, heading} = res[0];

        setAccuracy(Math.round((accuracy + Number.EPSILON) * 10) / 10);
        setLocation((location) => ({
          ...location,
          longitude,
          latitude,
          heading,
        }));
        mapRef.current?.animateCamera({center: {longitude, latitude}});
      });
    });

    return () => {
      unsubscribeLocation?.();
    };
  }, []);

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
            coordinate={{
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
            }}
            anchor={{x: 0.5, y: 1}}>
            <Ionicons
              name="location-sharp"
              size={40}
              color={PRIMARY}
              style={{opacity: 0.75}}
            />
          </Marker.Animated>
        </MapView>

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
          Location Accuracy: {accuracy < Infinity && accuracy + ' m'}
        </Text>

        <Text style={[styles.minAccuracy, {opacity: blinkOpacity}]}>
          <Text style={styles.bold}> Minimum accuracy required is 10 m.</Text>
          {'\n'}
          Kindly stay near the entrance of your business location and open to
          the sky for few seconds to get higher accuracy.
        </Text>

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
    marginBottom: 5,
  },
  minAccuracy: {
    textAlign: 'center',
    marginBottom: 5,
    color: PRIMARY,
  },
  bold: {
    fontWeight: 'bold',
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
    marginBottom: 15,
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
