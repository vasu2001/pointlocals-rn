import axios from 'axios';

export const baseURL = 'http://staging.pointlocals.com/api';

export default axios.create({
  baseURL,
});
