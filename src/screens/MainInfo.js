import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {boxStyle} from '../utils/styles';
import {PRIMARY, TEXT} from '../utils/colors';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomDropdown from '../components/CustomDropdown';
import TncRow from '../components/TncRow';

const MainInfo = () => {
  const [tnc, setTnc] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [locationType, setLocationType] = useState('');

  return (
    <View style={styles.main}>
      <View style={boxStyle}>
        <CustomInput
          value={locationName}
          setValue={setLocationName}
          label="Location Name*"
          placeholder="Location Name*"
          icon={
            <SimpleLineIcons
              name="location-pin"
              color={PRIMARY}
              size={18}
              style={{marginHorizontal: 5}}
            />
          }
        />

        <CustomDropdown
          value={locationType}
          setValue={setLocationType}
          label="Location Type*"
          placeholder="Location Type*"
          icon={
            <SimpleLineIcons
              name="location-pin"
              color={PRIMARY}
              size={18}
              style={{marginHorizontal: 5}}
            />
          }
        />
      </View>

      <TncRow tnc={tnc} setTnc={setTnc} />
      <CustomButton text="Save Location" />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
  },
});

export default MainInfo;
