import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Iconicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';

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
    ...initialCoor,
    address: '',
    pinCode: '',
  });
  const [mapLocation, setMapLocation] = useState(initialCoor);

  // weird bug with map- requires a style update for showing zoom controls
  const [mapHeight, setMapHeight] = useState(200);

  const mapRef = useRef();
  const addressRef = useRef();
  const dispatch = useDispatch();

  const setLocationField = (field) => (value) =>
    setLocation({
      ...location,
      [field]: value,
    });

  // manually changing lat/long
  const setMapCoor = (field) => () => {
    if (location[field] === '') {
      setLocationField(field)('0');
    }
    setMapLocation((mapLocation) => {
      const newMapLocation = {
        ...mapLocation,
        [field]: parseFloat(location[field]),
      };
      mapRef.current?.animateCamera({center: newMapLocation});
      return newMapLocation;
    });
  };

  const getCurrentLocation = async () => {
    dispatch(startLoading);

    try {
      await PermissionsAndroid.requestMultiple([
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.ACCESS_WIFI_STATE',
      ]);
      const places = await RNGooglePlaces.getCurrentPlace([
        'address',
        'location',
      ]);
      // console.log(places);

      navigator.geolocation.getCurrentPosition((res) => {
        // console.log(res);
        const {accuracy} = res.coords;
        setAccuracy(Math.round((accuracy + Number.EPSILON) * 10) / 10);
      });

      setLocation({
        ...location,
        ...places[0].location,
        address: places[0].address,
      });
      setMapLocation(places[0].location);
      mapRef.current?.animateCamera({center: places[0].location});
    } catch (err) {
      console.log(err);
    }

    dispatch(stopLoading);
  };

  const changeAddress = () => {
    RNGooglePlaces.openAutocompleteModal(
      {
        initialQuery: location.address,
      },
      ['address', 'location'],
    )
      .then((place) => {
        console.log(place);

        setLocation({
          ...location,
          address: place.address,
          ...place.location,
        });
        setMapLocation(place.location);
        mapRef.current?.animateCamera({center: place.location});
      })
      .catch((err) => {
        console.log(err);
      });

    addressRef.current?.blur();
  };

  const onNext = () => {
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
          <Marker
            draggable
            coordinate={mapLocation}
            onDragEnd={(e) => {
              console.log(e.nativeEvent.coordinate);
              setLocation({...location, ...e.nativeEvent.coordinate});
            }}
          />
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
          onFocus={changeAddress}
          inputRef={addressRef}
        />

        <CustomInput
          value={location.pinCode}
          setValue={setLocationField('pinCode')}
          placeholder="Pin Code (Post Code)*"
          label="Pin Code (Post Code)*"
          keyboardType="number-pad"
          icon={
            <Iconicons
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
        <View style={styles.locRow}>
          <CustomInput
            value={location.latitude.toString()}
            setValue={setLocationField('latitude')}
            placeholder="Lat*"
            label="Lat*"
            style={styles.locInput}
            keyboardType="number-pad"
            icon={locationIcon}
            onEndEditing={setMapCoor('latitude')}
          />
          <CustomInput
            value={location.longitude.toString()}
            setValue={setLocationField('longitude')}
            placeholder="Long*"
            label="Long*"
            style={styles.locInput}
            keyboardType="number-pad"
            icon={locationIcon}
            onEndEditing={setMapCoor('longitude')}
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
