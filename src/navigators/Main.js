import React from 'react';
import {Text, View, Modal, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import Auth from '../screens/Auth';
import MainNavigator from './MainNavigator';

const Main = ({}) => {
  const {loading, loggedIn} = useSelector((state) => state);

  return (
    <>
      {loggedIn ? <MainNavigator /> : <Auth />}

      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.modal}>
          <Text>loading</Text>
        </View>
      </Modal>
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
