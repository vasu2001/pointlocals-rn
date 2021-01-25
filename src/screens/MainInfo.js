import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {boxStyle} from '../utils/styles';
import {PRIMARY} from '../utils/colors';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import TncRow from '../components/TncRow';

const MainInfo = () => {
  const [tnc, setTnc] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [sLoc, setSLoc] = useState('');

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

      <TncRow tnc={tnc} setTnc={setTnc} />
      <CustomButton text="Save Location" />
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
});

export default MainInfo;
