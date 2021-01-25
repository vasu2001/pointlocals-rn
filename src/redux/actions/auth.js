import axios from '../../utils/axios';

const startLoading = {
    type: 'LOADING',
    payload: true,
  },
  stopLoading = {
    type: 'LOADING',
    payload: false,
  };

export const login = ({username, password, type}) => async (dispatch) => {
  dispatch(startLoading);

  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('type', '0');
    formData.append('type', 'site');

    const {data} = await axios.post('login', formData);
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
