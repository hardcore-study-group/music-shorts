import SpotifyWebApi from 'spotify-web-api-node';
import {config} from 'firebase-functions';

const spotify = new SpotifyWebApi({
  clientId: config().spotify.client_id,
  clientSecret: config().spotify.client_secret,
  redirectUri: config().spotify.redirect_uri,
});

const OAUTH_SCOPES = ['user-read-email'];

export const getOAuthUrl = () => {
  return spotify.createAuthorizeURL(OAUTH_SCOPES, '');
};
