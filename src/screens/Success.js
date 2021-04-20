import React from 'react';
import {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  ToastAndroid,
  Share,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

import CustomButton from '../components/CustomButton';
import {PRIMARY} from '../utils/colors';
import {useSelector} from 'react-redux';

const Success = ({navigation}) => {
  const url = useSelector((state) => state.shareURL);

  const handler = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Dashboard'}],
      }),
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, []);

  const onCopy = () => {
    Clipboard.setString(url.toString());
    ToastAndroid.show('Link Copied to clipbard', ToastAndroid.SHORT);
  };

  const onShare = () => {
    Share.share({
      message: url,
    });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.success}>Location uploaded successfully!</Text>
      <Text style={styles.url}>{url}</Text>

      <CustomButton text="Copy Link" style={styles.copy} onPress={onCopy} />
      <CustomButton text="Share Link" style={styles.copy} onPress={onShare} />
      <CustomButton text="Go to Dashboard" onPress={handler} />
      <Text style={styles.note}>
        Note: You will receive Rs.6 after verification within 2 to 6 days.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  success: {
    color: PRIMARY,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  url: {
    color: '#000000a0',
    marginTop: 20,
    marginBottom: 120,
    textAlign: 'center',
  },
  note: {
    color: '#000000a0',
    marginTop: 20,
    textAlign: 'center',
  },

  copy: {
    marginBottom: 15,
  },
});

export default Success;
