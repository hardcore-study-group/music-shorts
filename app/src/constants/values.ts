import {Platform} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {AuthConfiguration, authorize} from 'react-native-app-auth';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const SPOTIFY_URL = {
  playstore: 'https://play.google.com/store/apps/details?id=com.spotify.music',
  appstore: 'https://apps.apple.com/app/id324684580',
};
export const SPOTIFY_CLIENT_ID = 'babda1a147134d70b64cb301089cfeaa';

export const BASE_URL = (() => {
  const LOCAL_IP = '192.168.10.13';
  const PROD_TEST_MODE = true;
  if (!__DEV__ || PROD_TEST_MODE)
    return 'https://us-central1-music-shorts.cloudfunctions.net/api';
  if (IS_ANDROID) {
    if (deviceInfoModule.isEmulatorSync())
      return 'http://10.0.2.2:5000/music-shorts/us-central1/api';
    else return `http://${LOCAL_IP}:5000/music-shorts/us-central1/api`;
  }
  if (IS_IOS) {
    if (deviceInfoModule.isEmulatorSync())
      return 'http://localhost:5000/music-shorts/us-central1/api';
    else return `http://${LOCAL_IP}:5000/music-shorts/us-central1/api`;
  }
  return '';
})();

export const SPOTIFY_AUTH_CONFIG: AuthConfiguration = {
  clientId: SPOTIFY_CLIENT_ID,
  redirectUrl: 'musicshorts:/oauth',
  scopes: [
    'ugc-image-upload',
    'playlist-read-private',
    'playlist-modify-private',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: `${BASE_URL}/auth/token/swap`,
  },
  useNonce: false,
  usePKCE: false,
};
const YOUTUBE_OAUTH_APP_GUID = IS_IOS
  ? '866427811004-0n642qupjqslsei42oaao0v42ob58m6q'
  : __DEV__
  ? '866427811004-6qakvinrj9jknvktfg0gneulh8tb2efe'
  : '866427811004-0flr8dedmumo85auk5ttvbpgr2up7s6t';
export const YOUTUBE_AUTH_CONFIG: AuthConfiguration = {
  issuer: 'https://accounts.google.com',
  clientId: `${YOUTUBE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  redirectUrl: `com.googleusercontent.apps.${YOUTUBE_OAUTH_APP_GUID}:/oauth2redirect/google`,
  scopes: [
    'openid',
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/youtube.readonly',
  ],
};
