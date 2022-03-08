import {Platform} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {ApiConfig, ApiScope} from 'react-native-spotify-remote';

export const AGREEMENTS = [];
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const SPOTIFY_URL = {
  playstore: 'https://play.google.com/store/apps/details?id=com.spotify.music',
  appstore: 'https://apps.apple.com/app/id324684580',
};
export const SPOTIFY_CLIENT_ID = 'babda1a147134d70b64cb301089cfeaa';
export const SPOTIFY_PREMIUM_URL = 'https://www.spotify.com/premium';

export const BASE_URL = (() => {
  const LOCAL_IP = '192.168.10.12';
  const PROD_TEST_MODE = false;
  if (!__DEV__ || PROD_TEST_MODE)
    return 'https://us-central1-music-shorts.cloudfunctions.net/api';
  if (IS_ANDROID) {
    if (deviceInfoModule.isEmulatorSync())
      return 'http://10.0.2.2:5001/music-shorts/us-central1/api';
    else return `http://${LOCAL_IP}:5000/music-shorts/us-central1/api`;
  }
  if (IS_IOS) {
    if (deviceInfoModule.isEmulatorSync())
      return 'http://localhost:5001/music-shorts/us-central1/api';
    else return `http://${LOCAL_IP}:5000/music-shorts/us-central1/api`;
  }
  return '';
})();

export const SPOTIFY_CONFIG: ApiConfig = {
  clientID: SPOTIFY_CLIENT_ID,
  redirectURL: 'musicshorts://spotify-login-callback',
  scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserReadPrivateScope,
    ApiScope.PlaylistModifyPrivateScope,
    ApiScope.PlaylistReadPrivateScope,
    ApiScope.PlaylistReadCollaborativeScope,
    ApiScope.UGCImageUploadScope,
  ],
  tokenSwapURL: `${BASE_URL}/auth/token/swap`,
  tokenRefreshURL: `${BASE_URL}/auth/token/refresh`,
};
