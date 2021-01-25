import React from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {login} from '../redux/actions/auth';
import {BACKGROUND, PRIMARY} from '../utils/colors';

const {width} = Dimensions.get('screen');

const Auth = ({}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  return (
    <View style={styles.main}>
      <Image style={styles.bg} source={require('../assets/bg.jpg')} />
      <>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.name}>Login</Text>
      </>

      <View style={styles.fields}>
        <CustomInput
          value={username}
          setValue={setUsername}
          placeholder="Username"
          icon={<AntDesign name="user" size={19} color={PRIMARY} />}
        />
        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder="Password"
          secureTextEntry
          icon={<AntDesign name="lock1" size={19} color={PRIMARY} />}
        />
        <CustomButton
          text="Login"
          style={styles.login}
          onPress={() => dispatch(login())}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  logo: {
    height: 100,
    width: 80,
  },
  name: {
    color: PRIMARY,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 150,
  },
  bg: {
    position: 'absolute',
    opacity: 0.5,
    bottom: -100,
    height: width,
    width,
  },

  fields: {
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  login: {
    marginTop: 10,
  },
});

export default Auth;
