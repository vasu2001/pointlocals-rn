import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Iconicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import TncRow from '../components/TncRow';
import {PRIMARY} from '../utils/colors';
import {boxStyle} from '../utils/styles';

const Location = ({}) => {
  const [tnc, setTnc] = useState(false);
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [mapCoor, setMapCoor] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const pos = {};

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={boxStyle}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}>
          <Marker
            draggable
            coordinate={mapCoor}
            onDragEnd={(e) => {
              console.log(e.nativeEvent.coordinate);
              setMapCoor(e.nativeEvent.coordinate);
            }}
          />
        </MapView>
        <Text style={styles.text}>
          Select a point in the map or enter manually below.
        </Text>

        <CustomInput
          value={address}
          setValue={setAddress}
          placeholder="Address*"
          label="Address*"
          numberOfLines={3}
          icon={locationIcon}
        />

        <CustomInput
          value={pinCode}
          setValue={setPinCode}
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

        <CustomButton text="Copy Geolocation" />
        <View style={styles.locRow}>
          <CustomInput
            value={lat}
            setValue={setLat}
            placeholder="Lat*"
            label="Lat*"
            style={styles.locInput}
            keyboardType="number-pad"
            icon={locationIcon}
          />
          <CustomInput
            value={long}
            setValue={setLong}
            placeholder="Long*"
            label="Long*"
            style={styles.locInput}
            keyboardType="number-pad"
            icon={locationIcon}
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
