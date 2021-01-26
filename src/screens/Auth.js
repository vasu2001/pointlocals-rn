import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import React from 'react';
import {useEffect} from 'react';
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
  const [username, setUsername] = useState('apto');
  const [password, setPassword] = useState('pass');

  const dispatch = useDispatch();

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // dispatch success
      console.log(userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const fbSignIn = (error, result) => {
    if (error) {
      console.log('login has error: ' + result.error);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
        console.log(data.accessToken.toString());
      });
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

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
          onPress={() =>
            dispatch(login({username, password, type: 'username/pass'}))
          }
        />

        <GoogleSigninButton onPress={googleSignIn} style={styles.google} />
        <LoginButton onLoginFinished={fbSignIn} style={styles.fb} />
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
  google: {
    alignSelf: 'center',
    marginTop: 10,
    width: 120,
  },
  fb: {
    alignSelf: 'center',
    // marginTop: 10,
    width: 100,
    height: 35,
  },
});

export default Auth;
