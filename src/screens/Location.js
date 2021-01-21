import React, {useState, useEffect, useRef} from 'react';
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
import TncRow from '../components/TncRow';
import {PRIMARY} from '../utils/colors';
import {boxStyle} from '../utils/styles';

const Location = ({}) => {
  const [tnc, setTnc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: '',
    pinCode: '',
  });
  const [mapLocation, setMapLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const mapRef = useRef();
  const addressRef = useRef();

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
    setLoading(true);

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

    setLoading(false);
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

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={boxStyle}>
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}>
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
        <Text style={styles.locationAcc}>Location Accuracy: 6m</Text>

        <CustomButton
          text="Copy Geolocation"
          onPress={getCurrentLocation}
          disabled={loading}
        />
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

      <TncRow tnc={tnc} setTnc={setTnc} />
      <CustomButton text="Save Location" />
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
    height: 200,
    backgroundColor: 'lightgray',
    marginBottom: 5,
  },
});

export default Location;
