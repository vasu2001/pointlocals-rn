import axios from 'axios';

export const serverURL = 'https://pointlocals.com';

export default axios.create({
  baseURL: serverURL,
});
