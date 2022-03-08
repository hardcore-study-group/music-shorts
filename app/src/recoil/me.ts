import {selector} from 'recoil';
import axios from '../config/axios';
import {accessTokenQuery} from './auth';

export const meQuery = selector<SpotifyApi.CurrentUsersProfileResponse>({
  key: 'me',
  get: async ({get}) => {
    try {
      get(accessTokenQuery);
      const {data} = await axios.get('/me');
      return data;
    } catch (error) {
      return error;
    }
  },
});
