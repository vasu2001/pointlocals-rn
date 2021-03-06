import {Alert, ToastAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import axios, {serverURL} from '../../utils/axios';
import {startLoading, stopLoading} from '../../utils/reduxHelpers';

export const getUserRecord = () => async (dispatch) => {
  try {
    const [
      {data: deletedData},
      {data: verifiedData},
      {data: totalData},
      {data: shareData},
    ] = await Promise.all([
      axios.post('/api/totalDeleted'),
      axios.post('/api/totalVerified'),
      axios.post('/api/totalUploaded'),
      axios.post('/api/getShare'),
    ]);

    // console.log({deletedData, verifiedData, totalData});
    dispatch({
      type: 'USER_RECORD',
      payload: {
        deleted: deletedData?.count ?? -1,
        uploaded: totalData?.count ?? -1,
        verified: verifiedData?.count ?? -1,
      },
    });
    dispatch({
      type: 'SHARE_URL',
      payload: shareData?.url ?? '',
    });
  } catch (err) {
    console.log(err);
  }
};

export const uploadImage = (image, type) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const {data: jsonData} = await RNFetchBlob.fetch(
      'POST',
      serverURL + '/ajax',
      {},
      [
        {name: 'action', data: 'upload_image'},

        {name: 'imageCategory', data: type},
        {name: 'api', data: '1'},
        {
          name: 'Image[]',
          data: RNFetchBlob.wrap(image.uri),
          filename: image.fileName,
          type: image.type,
        },
      ],
    );
    // console.log(jsonData.substring(0, 500));
    const data = JSON.parse(jsonData);

    // console.log(data);
    dispatch({
      type: 'UPLOAD_IMAGE',
      payload: {
        type,
        path: data.info.path,
      },
    });
  } catch (err) {
    // console.log(JSON.stringify(err));
    console.log(err);
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
    const {latitude, longitude} = data;

    const formData = new FormData();
    formData.append('lat', latitude);
    formData.append('lon', longitude);
    formData.append('name', locationName);

    const {data: similarData} = await axios.post(
      '/api/locationCheck',
      formData,
    );
    // console.log(similarData);

    if (!similarData.duplicate) {
      // location is unique
      dispatch(addToTemp(data));
      callback();
    } else {
      navigator.alert(
        'The said location cannot be uploaded as Poinlocals already has a similar location in such area',
      );
    }
  } catch (err) {
    console.log('location check error:', err);
  }
  dispatch(stopLoading);
};

export const saveLocation = (callback) => async (dispatch, getState) => {
  dispatch(startLoading);
  try {
    const state = getState();
    // console.log('state', state.temp.phNo);
    const date = getDate();

    var data = new FormData();
    data.append('action', 'add_location');
    data.append('data[userId]', state.uid.toString());
    data.append('data[verified]', '0');
    data.append('data[locationType]', 'business');
    data.append('data[locationName]', state.temp.locationName.toString());
    data.append('data[locationAddress]', state.temp.address.toString());
    data.append('data[locationPostcode]', state.temp.pinCode.toString());
    data.append('data[locationLong]', state.temp.longitude.toString());
    data.append('data[locationLat]', state.temp.latitude.toString());
    data.append('data[locationDescription]', state.temp.description.toString());
    data.append('data[locationFloors]', state.temp.floors.toString());
    data.append('data[daysOpen]', '');
    data.append('data[Website]', state.temp.website.toString());
    data.append('data[mobilePhone]', state.temp.phNo[0].toString());
    data.append('data[mobileVerified]', '0');
    data.append('data[phoneOne]', state.temp.phNo[1].toString());
    data.append('data[phoneTwo]', state.temp.phNo[2].toString());
    data.append('data[Email]', state.temp.email.toString());
    data.append('data[Created]', date); //format of date unknown? epochs is not supported
    data.append('data[Updated]', date);
    data.append('data[ChangeRequest]', '0');
    state.temp.photos.entrance.forEach((path) =>
      data.append('data[entrancePhotos][]', path.toString()),
    );
    state.temp.photos.interior.forEach((path) =>
      data.append('data[interiorPhotos][]', path.toString()),
    );
    state.temp.photos.full.forEach((path) =>
      data.append('data[fullLookPhotos][]', path.toString()),
    );

    const res = await axios.post('/ajax', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Location created successfully');
    // ToastAndroid.show('Location uploaded successfully', ToastAndroid.SHORT);

    dispatch({
      type: 'RESET_TEMP',
    });
    callback();
  } catch (err) {
    console.log(err);
    // console.log(JSON.stringify(err));
  }
  dispatch(stopLoading);
};

export const updateSocial = (social, callback) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const formData = new FormData();
    formData.append('url', social);

    const res = await axios.post('/api/updateSocial', formData);
    // console.log(res.data);
    if (res.data.status == 200) {
      dispatch({
        type: 'UPDATE_SOCIAL',
        payload: social,
      });
      callback();
    } else {
      throw res.data;
    }
  } catch (err) {
    console.log(err);
    // console.log(JSON.stringify(err));
  }
  dispatch(stopLoading);
};

const getDate = () => {
  return Math.floor(Date.now() / 1000);
};
