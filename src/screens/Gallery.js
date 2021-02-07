import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';

import CustomButton from '../components/CustomButton';
import TncRow from '../components/TncRow';
import {PRIMARY, TEXT} from '../utils/colors';
import {boxStyle} from '../utils/styles';
import {uploadImage} from '../redux/actions/core';

const Gallery = ({}) => {
  const [tnc, setTnc] = useState(false);
  const dispatch = useDispatch();
  const {
    temp: {photos},
  } = useSelector((state) => state);

  return (
    <View style={styles.main}>
      <View style={boxStyle}>
        <UploadItem
          label="Entrance Photos*"
          style={{borderBottomWidth: 1, marginVertical: 5}}
          dispatch={dispatch}
          type="entrance"
          photos={photos}
        />
        <UploadItem
          label="Full Look Photos*"
          style={{borderBottomWidth: 1, marginVertical: 5}}
          dispatch={dispatch}
          type="full"
          photos={photos}
        />
        <UploadItem
          label="Interior Photos*"
          dispatch={dispatch}
          type="interior"
          photos={photos}
        />
      </View>

      <TncRow tnc={tnc} setTnc={setTnc} />
      <CustomButton text="Save Location" style={{marginBottom: 30}} />
    </View>
  );
};

const UploadItem = ({label, style, dispatch, type, photos}) => {
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

  const imageUploaded = !!photos[type];

  return (
    <View style={[styles.uploadItem, style]}>
      <Text style={styles.text}>{label}</Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() =>
          launchCamera(
            {
              mediaType: 'photo',
            },
            callback,
          )
        }>
        <Text style={[styles.lightText, imageUploaded && {color: TEXT}]}>
          {imageUploaded ? 'Image uploaded' : 'Tap here to upload files'}
        </Text>
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
});

export default Gallery;
