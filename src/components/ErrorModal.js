import React from 'react';
import {
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from './CustomButton';

const ErrorModal = () => {
  const dispatch = useDispatch();
  const {visible, message} = useSelector((state) => state.error);

  navigator.alert = (message) => {
    dispatch({
      type: 'UPDATE_ERROR',
      payload: {message, visible: true},
    });
  };

  const close = () => {
    dispatch({
      type: 'UPDATE_ERROR',
      payload: {message: '', visible: false},
    });
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.backdrop}>
        <TouchableWithoutFeedback onPress={close}>
          <View style={styles.main} />
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.main}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{message}</Text>

          <CustomButton text="OK" onPress={close} />
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
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    // fontWeight: 'bold',
  },
});

export default ErrorModal;
