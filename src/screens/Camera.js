import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {PRIMARY} from '../utils/colors';

const {height} = Dimensions.get('window');

const Camera = ({navigation, route}) => {
  const cameraRef = useRef(null);
  const {callback} = route.params;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        // console.log(data);
        const {
          coords: {heading, latitude, longitude},
        } = data;
        setLocation({
          GPSImgDirection: heading,
          GPSLatitude: latitude,
          GPSLongitude: longitude,
        });
      },
      (err) => {
        console.log(err);
        Alert.alert('Error getting location, check if location is enabled');
      },
      {
        timeout: 3000,
        enableHighAccuracy: false,
      },
    );
  }, []);

  const takePicture = async () => {
    try {
      if (!location) {
        Alert.alert('Please wait for the location to record');
        return;
      }

      if (cameraRef.current) {
        const options = {
          quality: 0.5,
          base64: false,
          exif: true,
          writeExif: location,
        };
        const {uri} = await cameraRef.current.takePictureAsync(options);
        // console.log(exif);

        callback({
          uri,
          type: 'image/jpeg',
          fileName: uri.split('/').pop(),
        });
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <View style={styles.cameraContainer}>
        <RNCamera style={styles.camera} ref={cameraRef} captureAudio={false} />
      </View>
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <FontAwesome name="camera" color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    height: height - 200,
  },
  camera: {
    width: '100%',
    height: height - 200,
  },
  captureButton: {
    alignSelf: 'stretch',
    height: 80,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Camera;
