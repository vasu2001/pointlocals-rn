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
    ] = await Promise.all([
      axios.post('/api/totalDeleted'),
      axios.post('/api/totalVerified'),
      axios.post('/api/totalUploaded'),
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

    const formData = new FormData();
    formData.append('lat', data.latitude);
    formData.append('lon', data.longitude);
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
      Alert.alert(
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

    var data = new FormData();
    data.append('action', 'add_location');
    data.append('data[userId]', state.uid.toString());
    data.append('data[verified]', '0');
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
    data.append('data[Created]', '1566994108'); //format of date unknown? epochs is not supported
    data.append('data[Updated]', '1566994108');
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
    ToastAndroid.show('Location uploaded successfully', ToastAndroid.SHORT);
    // console.log(res.data);

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
