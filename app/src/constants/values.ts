import {Platform} from 'react-native';

export const AGREEMENTS = [];
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const SPOTIFY_URL = {
  playstore: 'https://play.google.com/store/apps/details?id=com.spotify.music',
  appstore: 'https://apps.apple.com/app/id324684580',
};

export const BASE_URL =
  'https://us-central1-music-shorts.cloudfunctions.net/api';
