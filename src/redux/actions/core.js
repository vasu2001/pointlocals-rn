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
