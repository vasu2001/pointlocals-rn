import React from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import ErrorModal from '../components/ErrorModal';

import Auth from '../screens/Auth';
import {PRIMARY} from '../utils/colors';
import MainNavigator from './MainNavigator';

const Main = ({}) => {
  const {loading, loggedIn} = useSelector((state) => state);

  return (
    <>
      {loggedIn ? <MainNavigator /> : <Auth />}

      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.modal}>
          <ActivityIndicator color={PRIMARY} animating size={50} />
        </View>
      </Modal>

      <ErrorModal />
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#ffffff80',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
