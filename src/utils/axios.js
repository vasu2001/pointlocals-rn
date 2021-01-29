import axios from 'axios';

export const serverURL = 'http://staging.pointlocals.com';

export default axios.create({
  baseURL: serverURL,
});
