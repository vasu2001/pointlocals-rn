import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {addToTemp} from '../redux/actions/core';
import {PRIMARY} from '../utils/colors';
import {boxStyle} from '../utils/styles';

const Details = ({navigation}) => {
  const [] = useState(false);
  const [floors, setFloors] = useState('');
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch();

  const onNext = () => {
    dispatch(
      addToTemp({
        floors,
        description: desc,
      }),
    );
    navigation.navigate('Contact');
  };

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

      <View style={styles.bottom}>
        <CustomButton text="Previous" onPress={() => navigation.goBack()} />
        <CustomButton text="Next" style={styles.next} onPress={onNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
  },
  bottom: {
    marginTop: 25,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  next: {
    marginLeft: 10,
  },
});

export default Details;
