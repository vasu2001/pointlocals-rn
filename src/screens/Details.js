import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import TncRow from '../components/TncRow';
import {PRIMARY} from '../utils/colors';
import {boxStyle} from '../utils/styles';

const Details = ({}) => {
  const [tnc, setTnc] = useState(false);
  const [floors, setFloors] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <View style={styles.main}>
      <View style={boxStyle}>
        <CustomInput
          value={floors}
          setValue={setFloors}
          placeholder="Floors"
          label="Floors"
          keyboardType="number-pad"
          icon={
            <FontAwesome
              name="building-o"
              size={18}
              color={PRIMARY}
              style={{marginHorizontal: 5}}
            />
          }
        />

        <CustomInput
          value={desc}
          setValue={setDesc}
          placeholder="Give a description for your business"
          label="Description"
          icon={
            <Ionicons
              name="md-document-text"
              size={19}
              color={PRIMARY}
              style={{marginHorizontal: 5}}
            />
          }
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
});

export default Details;
