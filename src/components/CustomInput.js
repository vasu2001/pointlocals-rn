import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {BACKGROUND} from '../utils/colors';

const CustomInput = ({
  value,
  setValue,
  style,
  placeholder,
  label,
  icon,
  numberOfLines,
  keyboardType,
  maxLength,
  secureTextEntry,
  multiline,
}) => {
  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View style={styles.box}>
          {icon}
          <TextInput
            style={styles.input}
            {...{
              value,
              onChangeText: setValue,
              placeholder,
              numberOfLines,
              multiline: !!numberOfLines,
              keyboardType,
              maxLength,
              multiline,
              secureTextEntry,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 14,
  },

  box: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'lightgray',
    alignItems: 'center',
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  input: {
    padding: 5,
    fontSize: 15,
    flex: 1,
  },
});

export default CustomInput;
