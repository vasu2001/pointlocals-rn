import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PRIMARY, TEXT} from '../utils/colors';

const TncRow = ({tnc, setTnc, style}) => (
  <View style={[styles.tncRow, style]}>
    <CheckBox value={tnc} onValueChange={setTnc} tintColors={{true: PRIMARY}} />

    <Text style={styles.text}>
      I Read & Agree with the{' '}
      <Text
        onPress={() => {
          console.log('open tnc');
        }}
        style={styles.touchText}>
        Terms & Conditions
      </Text>{' '}
      of Pointlocals
    </Text>
  </View>
);

const styles = StyleSheet.create({
  tncRow: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 5,
    width: 300,
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: TEXT,
    marginLeft: 15,
  },
  touchText: {
    color: PRIMARY,
    textDecorationLine: 'underline',
    textDecorationColor: PRIMARY,
  },
});

export default TncRow;
