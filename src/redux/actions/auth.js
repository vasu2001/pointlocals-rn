import {GoogleSignin} from '@react-native-community/google-signin';
import {ToastAndroid} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import axios from '../../utils/axios';
import {startLoading, stopLoading} from '../../utils/reduxHelpers';

export const login = ({username, password, type, extId}) => async (
  dispatch,
) => {
  dispatch(startLoading);

  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('typeId', '0');
    formData.append('type', type);

    if (type === 'google' || type === 'facebook') {
      formData.append('extId', extId);
    }

    const {data} = await axios.post('/api/login', formData);

    if (data?.code === 200)
      dispatch({
        type: 'LOGIN',
        payload: {...data?.info, type},
      });
    else {
      ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      if (type === 'facebook') LoginManager.logOut();
      else if (type === 'google') GoogleSignin.signOut();

      throw data?.message;
    }

    // console.log(data);
  } catch (err) {
    console.log('ERROR', err);
  }

  dispatch(stopLoading);
};

export const logout = () => (dispatch, getState) => {
  // dispatch(startLoading);
  const {type} = getState();
  if (type === 'facebook') {
    LoginManager.logOut();
  } else if (type === 'google') {
    GoogleSignin.signOut();
  }

  dispatch({
    type: 'LOGOUT',
  });
};
