import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

import CustomButton from '../components/CustomButton';
import TncRow from '../components/TncRow';
import {PRIMARY, TEXT} from '../utils/colors';
import {boxStyle} from '../utils/styles';
import {saveLocation, uploadImage} from '../redux/actions/core';

const Gallery = ({navigation}) => {
  const [tnc, setTnc] = useState(false);
  const dispatch = useDispatch();
  const {
    temp: {photos},
  } = useSelector((state) => state);

  const onSubmit = () => {
    if (!tnc) {
      Alert.alert('Accept TnC');
    } else if (photos.full.length === 0) {
      Alert.alert('Full look photos are mandatory, please upload atleast one.');
    } else if (photos.entrance.length === 0) {
      Alert.alert('Entrance photos are mandatory, please upload atleast one.');
    } else
      dispatch(
        saveLocation(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            }),
          );
        }),
      );
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={boxStyle}>
        <UploadItem
          label="Entrance Photos*"
          style={{borderBottomWidth: 1, marginVertical: 5}}
          dispatch={dispatch}
          type="entrance"
          photos={photos}
          navigation={navigation}
        />
        <UploadItem
          label="Full Look Photos*"
          style={{borderBottomWidth: 1, marginVertical: 5}}
          dispatch={dispatch}
          type="full"
          photos={photos}
          navigation={navigation}
        />
        <UploadItem
          label="Interior Photos"
          dispatch={dispatch}
          type="interior"
          photos={photos}
          navigation={navigation}
        />
      </View>

      <TncRow tnc={tnc} setTnc={setTnc} />

      <View style={styles.bottom}>
        <CustomButton text="Previous" onPress={() => navigation.goBack()} />
        <CustomButton
          text="Save Location"
          style={styles.submit}
          onPress={onSubmit}
        />
      </View>
    </ScrollView>
  );
};

const UploadItem = ({label, style, dispatch, type, photos, navigation}) => {
  const callback = (photo) => {
    if (photo.didCancel) {
      console.log('cancel photo picker');
    } else if (photo.errorCode) {
      console.log(photo.errorMessage);
    } else {
      // console.log(photo);
      dispatch(uploadImage(photo, type));
    }
  };

  const imageUploaded = photos[type].length > 0;

  return (
    <View style={[styles.uploadItem, style]}>
      <Text style={styles.text}>{label}</Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => navigation.navigate('Camera', {callback})}>
        {imageUploaded ? (
          <View style={styles.imageRow}>
            {photos[type].map((path, index) => (
              <Image
                key={index.toString()}
                source={{uri: 'https://www.pointlocals.com' + path}}
                style={styles.image}
              />
            ))}
            <Text style={styles.uploadMore}>Tap here to{'\n'}upload more</Text>
          </View>
        ) : (
          <Text style={styles.lightText}>Tap here to upload files</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.lightText}>6MB Max. Upload Size</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
  },

  text: {
    color: TEXT,
    fontSize: 14,
  },

  uploadItem: {
    paddingVertical: 5,
    borderColor: 'darkgray',
  },
  uploadButton: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    padding: 10,
    borderColor: PRIMARY,
    alignItems: 'center',
    marginVertical: 5,
  },
  lightText: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 5,
  },

  imageRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
    backgroundColor: 'lightgray',
    marginRight: 5,
  },
  uploadMore: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    flex: 1,
  },

  bottom: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  submit: {
    marginLeft: 10,
  },
});

export default Gallery;
