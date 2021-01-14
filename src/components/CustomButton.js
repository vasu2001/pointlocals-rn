import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BACKGROUND, PRIMARY} from '../utils/colors';

const CustomButton = ({onPress, style, text}) => {
  return (
    <TouchableOpacity style={[styles.main, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    alignSelf: 'center',
    paddingHorizontal: 25,
    paddingVertical: 8,
    backgroundColor: PRIMARY,
    borderRadius: 20,
  },
  text: {
    color: BACKGROUND,
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default CustomButton;
