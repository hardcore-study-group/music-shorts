import axios from 'axios';
import {config} from 'firebase-functions';

const youtube = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    key: process.env.NODE_ENV === 'test' ? '' : config().youtube.key,
  },
});

export default youtube;
