import React from 'react';
import {useState} from 'react';
import {
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {PRIMARY} from '../utils/colors';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

const UrlModal = ({type, visible, setVisible}) => {
  const [input, setInput] = useState('');

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.backdrop}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.main} />
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.main}>
        <View style={styles.dialog}>
          <Text style={styles.title}>Enter {type} profile URL</Text>
          <CustomInput
            value={input}
            setValue={setInput}
            placeholder="profile link"
            style={styles.input}
          />

          <CustomButton text="Save" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.6,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    marginHorizontal: -25,
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    paddingBottom: 15,
    borderColor: PRIMARY,
  },
  input: {
    marginBottom: 15,
  },
});

export default UrlModal;
