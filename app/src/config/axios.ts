import _axios from 'axios';
import {BASE_URL} from '../constants/values';

const axios = _axios.create();

axios.defaults.baseURL = BASE_URL;

export default axios;
