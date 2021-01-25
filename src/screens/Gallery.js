import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import CustomButton from '../components/CustomButton';
import TncRow from '../components/TncRow';
import {PRIMARY, TEXT} from '../utils/colors';
import {boxStyle} from '../utils/styles';

const Gallery = ({}) => {
  const [tnc, setTnc] = useState(false);

  return (
    <View style={styles.main}>
      <View style={boxStyle}>
        <UploadItem
          label="Entrance Photos*"
          style={{borderBottomWidth: 1, marginVertical: 5}}
        />
        <UploadItem
          label="Full Look Photos*"
          style={{borderBottomWidth: 1, marginVertical: 5}}
        />
        <UploadItem label="Interior Photos*" />
      </View>

      <TncRow tnc={tnc} setTnc={setTnc} />
      <CustomButton text="Save Location" style={{marginBottom: 30}} />
    </View>
  );
};

const UploadItem = ({label, style}) => {
  return (
    <View style={[styles.uploadItem, style]}>
      <Text style={styles.text}>{label}</Text>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.lightText}>Tap here to upload files</Text>
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
