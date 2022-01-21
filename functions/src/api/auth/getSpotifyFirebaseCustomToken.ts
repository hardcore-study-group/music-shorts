import {https} from 'firebase-functions';
import {HttpsError} from 'firebase-functions/v1/https';
import {GetSpotifyFirebaseCustomTokenData} from '../../../type/api/auth';
import {admin, createFirebaseAccount} from '../../service/firebase';
import {spotify} from '../../service/spotify';

export const getSpotifyFirebaseCustomToken = https.onCall(
  async (data: GetSpotifyFirebaseCustomTokenData, context) => {
    if (context.auth)
      throw new HttpsError('already-exists', 'Already signed in');

    const {spotifyCode} = data;

    const credential = await spotify.authorizationCodeGrant(spotifyCode);
    spotify.setAccessToken(credential.body.access_token);
    const me = await spotify.getMe();

    const user = await createFirebaseAccount({
      uid: `spotify:${me.body.id}`,
      email: me.body.email,
      refreshToken: credential.body.refresh_token,
      accessToken: credential.body.access_token,
    });

    const token = await admin.auth().createCustomToken(user.uid);
    return token;
  },
);