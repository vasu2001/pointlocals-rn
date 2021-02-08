import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {addToTemp} from '../redux/actions/core';
import {PRIMARY} from '../utils/colors';
import {boxStyle} from '../utils/styles';

const Contact = ({navigation}) => {
  const [] = useState(false);
  const [phNo, setPhNo] = useState('');
  const [phNo1, setPhNo1] = useState('');
  const [phNo2, setPhNo2] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onNext = () => {
    dispatch(
      addToTemp({
        phNo: [phNo, phNo1, phNo2],
        email,
        website,
      }),
    );
    navigation.navigate('Gallery');
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={boxStyle}>
        <CustomInput
          value={phNo}
          setValue={setPhNo}
          placeholder="Mobile Phone Number*"
          label="Mobile Phone Number"
          keyboardType="number-pad"
          maxLength={10}
          icon={phoneIcon}
          // rightComponent={<CustomButton text="Verify" style={styles.verify} />}
        />
        <CustomInput
          value={phNo1}
          setValue={setPhNo1}
          placeholder="Phone Number 1 (Optional)"
          keyboardType="number-pad"
          maxLength={10}
          icon={phoneIcon}
        />
        <CustomInput
          value={phNo2}
          setValue={setPhNo2}
          placeholder="Phone Number 2 (Optional)"
          keyboardType="number-pad"
          maxLength={10}
          icon={phoneIcon}
        />

        <CustomInput
          value={website}
          setValue={setWebsite}
          placeholder="Website"
          label="Website"
          icon={websiteIcon}
        />
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder="Email"
          label="Email"
          icon={emailIcon}
        />
      </View>

      <View style={styles.bottom}>
        <CustomButton text="Previous" onPress={() => navigation.goBack()} />
        <CustomButton text="Next" style={styles.next} onPress={onNext} />
      </View>
    </ScrollView>
  );
};

const phoneIcon = (
  <AntDesign
    name="mobile1"
    size={18}
    color={PRIMARY}
    style={{marginHorizontal: 5}}
  />
);
const emailIcon = (
  <Entypo
    name="email"
    size={18}
    color={PRIMARY}
    style={{marginHorizontal: 5}}
  />
);
const websiteIcon = (
  <AntDesign
    name="laptop"
    size={18}
    color={PRIMARY}
    style={{marginHorizontal: 5}}
  />
);

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
  bottom: {
    marginTop: 25,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  next: {
    marginLeft: 10,
  },
});

export default Contact;
