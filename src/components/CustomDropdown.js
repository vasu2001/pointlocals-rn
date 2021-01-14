import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {BACKGROUND, TEXT} from '../utils/colors';

const CustomDropdown = ({value, setValue, style, placeholder, label, icon}) => {
  return (
    <View style={[{zIndex: 1}, style]}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.box}>
        {icon}

        <DropDownPicker
          defaultValue={value}
          onChangeItem={(item) => setValue(item.value)}
          placeholder={placeholder}
          items={[
            {label: 'a', value: 'a'},
            {label: 'b', value: 'b'},
          ]}
          style={{
            borderWidth: 0,
          }}
          itemStyle={{
            flex: 1,
          }}
          containerStyle={{
            height: 30,
            flex: 1,
            flexDirection: 'column',
          }}
          selectedLabelStyle={{
            color: TEXT,
            fontSize: 15,
          }}
          placeholderStyle={{
            color: 'gray',
            fontSize: 15,
          }}
        />
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
    marginBottom: 10,
    alignItems: 'center',
    overflow: 'visible',
    // zIndex: 999,
  },
  input: {
    padding: 5,
    fontSize: 15,
  },
});

export default CustomDropdown;
