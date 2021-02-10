import {Alert, ToastAndroid} from 'react-native';
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

export const saveLocation = (callback) => async (dispatch, getState) => {
  dispatch(startLoading);
  try {
    const state = getState();
    // console.log('state', state.temp.phNo);

    var data = new FormData();
    data.append('action', 'add_location');
    data.append('data[userId]', state.uid);
    data.append('data[verified]', '0');
    data.append('data[locationName]', state.temp.locationName);
    data.append('data[locationAddress]', state.temp.address);
    data.append('data[locationPostcode]', state.temp.pinCode);
    data.append('data[locationLong]', state.temp.longitude);
    data.append('data[locationLat]', state.temp.latitude);
    data.append('data[locationDescription]', state.temp.decription);
    data.append('data[locationFloors]', state.temp.floors);
    data.append('data[daysOpen]', '');
    data.append('data[Website]', state.temp.website);
    data.append('data[mobilePhone]', state.temp.phNo[0]);
    data.append('data[mobileVerified]', '0');
    data.append('data[phoneOne]', state.temp.phNo[1]);
    data.append('data[phoneTwo]', state.temp.phNo[2]);
    data.append('data[Email]', state.temp.email);
    data.append('data[Created]', '1566994108'); //format of date unknown? epochs is not supported
    data.append('data[Updated]', '1566994108');
    data.append('data[ChangeRequest]', '0');
    state.temp.photos.entrance.forEach((path) =>
      data.append('data[entrancePhotos][]', path),
    );
    state.temp.photos.interior.forEach((path) =>
      data.append('data[interiorPhotos][]', path),
    );
    state.temp.photos.full.forEach((path) =>
      data.append('data[fullLookPhotos][]', path),
    );

    const res = await axios.post('ajax', data);
    console.log('Location created successfully');
    ToastAndroid.show('Location uploaded successfully', ToastAndroid.SHORT);
    // console.log(res.data);

    dispatch({
      type: 'RESET_TEMP',
    });
    callback();
  } catch (err) {
    console.log(err);
  }
  dispatch(stopLoading);
};
