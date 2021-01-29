import axios from '../../utils/axios';
import {startLoading, stopLoading} from '../../utils/reduxHelpers';

export const login = ({username, password, type}) => async (dispatch) => {
  dispatch(startLoading);

  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('type', '0');
    formData.append('type', 'site');

    const {data} = await axios.post('/api/login', formData);
    dispatch({
      type: 'LOGIN',
      payload: data?.info,
    });

    // console.log(data);
  } catch (err) {
    console.log('ERROR', err);
  }

  dispatch(stopLoading);
};

export const logout = () => (dispatch) => {
  // dispatch(startLoading);
  dispatch({
    type: 'LOGOUT',
  });
};
