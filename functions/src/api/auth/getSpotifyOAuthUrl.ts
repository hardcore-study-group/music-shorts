import {https} from 'firebase-functions';
import {getOAuthUrl} from '../../service/spotify';

export const getSpotifyOAuthUrl = https.onCall(async (data, context) => {
  return getOAuthUrl();
});
