import axios from 'axios';
import {config} from 'firebase-functions/v1';

const musicDeveloper = axios.create();
musicDeveloper.defaults.baseURL = 'https://api.music.apple.com/v1';
if (process.env.NODE_ENV !== 'test')
  musicDeveloper.defaults.headers.common.Authorization = `Bearer ${
    config().apple.developer_token
  }`;

export default musicDeveloper;
