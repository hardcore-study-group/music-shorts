import SpotifyWebApi from 'spotify-web-api-node';
import {config} from 'firebase-functions';

export const spotify = new SpotifyWebApi({
  clientId: config().spotify.client_id,
  clientSecret: config().spotify.client_secret,
  redirectUri: config().spotify.redirect_uri,
});
