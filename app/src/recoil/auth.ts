import {Linking} from 'react-native';
import {auth} from 'react-native-spotify-remote';
import {selector} from 'recoil';
import axios from '../config/axios';

export const accessTokenQuery = selector({
  key: 'auth/accessToken',
  get: async () => {
    const session = await auth.getSession();
    axios.defaults.headers.common.Authorization = session
      ? `Bearer ${session.accessToken}`
      : '';

    return session?.accessToken;
  },
});

export const isAppInstalledQuery = selector({
  key: 'auth/isAppInstalled',
  get: async () => {
    const canOpen = await Linking.canOpenURL('spotify://');
    return canOpen;
  },
});
