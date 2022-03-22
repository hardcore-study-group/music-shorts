import SpotifyWebApi from 'spotify-web-api-node';
import {config} from 'firebase-functions';

export const spotify: SpotifyWebApi =
  process.env.NODE_ENV === 'test'
    ? (() => {
        const SpotifyTestApi = require('../../module/SpotifyTestApi').default;
        return new SpotifyTestApi();
      })()
    : new SpotifyWebApi({
        clientId: config().spotify.client_id,
        clientSecret: config().spotify.client_secret,
        redirectUri: config().spotify.app_redirect_uri,
      });

export const app_redirect_uri =
  process.env.NODE_ENV === 'test' ? '' : config().spotify.app_redirect_uri;
export const admin_redirect_uri =
  process.env.NODE_ENV === 'test' ? '' : config().spotify.admin_redirect_uri;
