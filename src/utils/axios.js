import axios from 'axios';

export const serverURL = 'https://staging.pointlocals.com';

export default axios.create({
  baseURL: serverURL,
});
