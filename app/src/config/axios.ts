import _axios from 'axios';
import {getUniqueId} from 'react-native-device-info';
import {BASE_URL} from '../constants/values';

const axios = _axios.create();
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.device_id = getUniqueId();

export default axios;
