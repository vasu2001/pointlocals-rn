import {Alert} from 'react-native';
import axios from '../../utils/axios';
import {startLoading, stopLoading} from '../../utils/reduxHelpers';

export const getUserRecord = () => async (dispatch) => {
  try {
    const [
      {data: deletedData},
      {data: verifiedData},
      {data: totalData},
    ] = await Promise.all([
      axios.post('/api/totalDeleted'),
      axios.post('/api/totalVerified'),
      axios.post('/api/totalUploaded'),
    ]);

    console.log({deletedData, verifiedData, totalData});
    dispatch({
      type: 'USER_RECORD',
      payload: {
        deleted: deletedData?.count ?? -1,
        uploaded: totalData?.count ?? -1,
        verified: verifiedData?.count ?? -1,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const uploadImage = (image, type) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const formData = new FormData();
    formData.append('action', 'upload_image');
    formData.append('imageCategory', type);
    formData.append('api', 1);
    formData.append('Image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    const {data} = await axios.post('https://pointlocals.com/ajax', formData);
    dispatch({
      type: 'UPLOAD_IMAGE',
      payload: {
        type,
        path: data.info.path,
      },
    });
    // console.log(data);
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  dispatch(stopLoading);
};

export const addToTemp = (items) => (dispatch) => {
  dispatch({
    type: 'UPDATE_TEMP',
    payload: items,
  });
};

export const addLocation = (data, callback) => async (dispatch, getState) => {
  dispatch(startLoading);

  try {
    const {
      temp: {locationName},
    } = getState();

    const formData = new FormData();
    formData.append('lat', data.latitude);
    formData.append('lon', data.longitude);
    formData.append('name', locationName);

    const {data: similarData} = await axios.post(
      'https://staging.pointlocals.com/api/locationCheck',
      formData,
    );
    // console.log(similarData);

    if (!similarData.duplicate) {
      // location is unique
      dispatch(addToTemp(data));
      callback();
    } else {
      Alert.alert('Similar Location exists already');
    }
  } catch (err) {
    console.log('loaction check error:', err);
  }
  dispatch(stopLoading);
};
