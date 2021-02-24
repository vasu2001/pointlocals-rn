import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
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
import {startLoading, stopLoading} from '../utils/reduxHelpers';

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
      dispatch(
        login({
          username: userInfo.user.email,
          password: '',
          type: 'google',
          extId: userInfo.user.id,
        }),
      );
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
    const getInfo = (data) => {
      const infoRequest = new GraphRequest(
        '/me?fields=email,name',
        null,
        (err, res) => {
          if (err) {
            console.log(err);
            dispatch(stopLoading);
          } else {
            dispatch(
              login({
                username: res.email,
                password: '',
                type: 'facebook',
                extId: res.id,
              }),
            );
          }
        },
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    };

    if (error) {
      console.log('login has error: ' + result.error);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      dispatch(startLoading);
      AccessToken.getCurrentAccessToken()
        .then(getInfo)
        .catch((err) => {
          console.log(err);
          dispatch(stopLoading);
        });
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  return (
    <View style={styles.main}>
      <Image style={styles.bg} source={require('../assets/bg.jpg')} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />

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
          onPress={() => dispatch(login({username, password, type: 'site'}))}
        />

        <View style={styles.oauth}>
          <GoogleSigninButton
            onPress={googleSignIn}
            style={styles.google}
            size={GoogleSigninButton.Size.Standard}
          />
          <LoginButton
            onLoginFinished={fbSignIn}
            style={styles.fb}
            permissions={['email']}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: 25,
    alignItems: 'center',
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  logo: {
    height: 100,
    width: 80,
    // marginBottom: 100,
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
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 15,
    right: 15,
  },
  login: {
    marginTop: 10,
  },

  oauth: {
    // flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  google: {
    // marginRight: 10,
  },
  fb: {
    width: 165,
    height: 30,
    transform: [{scale: 1.25}],
    margin: 9,
  },
});

export default Auth;
