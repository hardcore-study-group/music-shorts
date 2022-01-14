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

export const getCredential = async (code: string) => {
  const data = await spotify.authorizationCodeGrant(code);
  return data;
};

export const getMe = async (accessToken: string) => {
  spotify.setAccessToken(accessToken);
  const me = await spotify.getMe();
  return me;
};
