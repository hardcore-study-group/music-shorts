import {https} from 'firebase-functions';
import {spotify} from '../../service/spotify';

export const getSpotifyOAuthUrl = https.onCall(async (data, context) => {
  const url = spotify.createAuthorizeURL(['user-read-email'], '');
  return url;
});
