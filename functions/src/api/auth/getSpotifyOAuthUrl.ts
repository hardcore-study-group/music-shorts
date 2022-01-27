import {https} from 'firebase-functions';
import {GetSpotifyOAuthUrl} from '../../../type/api/auth';
import {spotify} from '../../service/spotify';

export const getSpotifyOAuthUrl = https.onCall(
  async (data: GetSpotifyOAuthUrl, context) => {
    const url = spotify.createAuthorizeURL(['user-read-email'], data.state);
    return url;
  },
);
