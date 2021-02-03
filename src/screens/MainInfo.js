import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {boxStyle} from '../utils/styles';
import {PRIMARY} from '../utils/colors';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {useDispatch} from 'react-redux';
import {addToTemp} from '../redux/actions/core';

const MainInfo = ({navigation}) => {
  const [] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [sLoc, setSLoc] = useState('');
  const dispatch = useDispatch();

  const onNext = () => {
    if (!locationName) {
      Alert.alert('Please enter a location name');
    } else {
      dispatch(addToTemp({locationName, similarLocationName: sLoc}));
      navigation.navigate('Location');
    }
  };

  return (
    <View style={styles.main}>
      <View style={boxStyle}>
        <CustomInput
          value={locationName}
          setValue={setLocationName}
          label="Location Name*"
          placeholder="Location Name*"
          icon={locationIcon}
        />

        <CustomInput
          value={sLoc}
          setValue={setSLoc}
          label="Similar Location Name"
          placeholder="Similar Location Name"
          icon={locationIcon}
        />
      </View>

      <CustomButton text="Next" style={styles.next} onPress={onNext} />
    </View>
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
  next: {
    marginTop: 25,
  },
});

export default MainInfo;
