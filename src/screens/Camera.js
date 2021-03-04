import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {PRIMARY} from '../utils/colors';

const {height} = Dimensions.get('window');

const Camera = ({navigation, route}) => {
  const cameraRef = useRef(null);
  const {callback} = route.params;

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: false};
      const {uri} = await cameraRef.current.takePictureAsync(options);

      callback({
        uri,
        type: 'image/jpeg',
        fileName: uri.split('/').pop(),
      });
      navigation.goBack();
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
    height: 75,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Camera;
