import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import TncRow from '../components/TncRow';
import {PRIMARY} from '../utils/colors';
import {boxStyle} from '../utils/styles';

const Contact = ({}) => {
  const [tnc, setTnc] = useState(false);
  const [phNo, setPhNo] = useState('');

  return (
    <View style={styles.main}>
      <View style={boxStyle}>
        <CustomInput
          value={phNo}
          setValue={setPhNo}
          placeholder="Mobile Phone Number"
          label="Mobile Phone Number"
          keyboardType="number-pad"
          maxLength={10}
          icon={
            <AntDesign
              name="mobile1"
              size={18}
              color={PRIMARY}
              style={{marginHorizontal: 5}}
            />
          }
          rightComponent={<CustomButton text="Verify" style={styles.verify} />}
        />
      </View>
      <TncRow tnc={tnc} setTnc={setTnc} />
      <CustomButton text="Save Location" style={{marginBottom: 30}} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
  },
  verify: {
    backgroundColor: 'green',
    alignSelf: 'center',
    marginLeft: 10,
    paddingHorizontal: 15,
  },
});

export default Contact;
