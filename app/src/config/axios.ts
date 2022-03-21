import _axios from 'axios';
import {getDeviceId} from 'react-native-device-info';
import {BASE_URL} from '../constants/values';

const axios = _axios.create();
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.device_id = getDeviceId();

export default axios;
