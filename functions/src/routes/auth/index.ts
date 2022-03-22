import {Router} from 'express';
import {admin} from '../../config/firebase';
import {
  admin_redirect_uri,
  app_redirect_uri,
  spotify,
} from '../../config/spotify';

const router = Router();

router.get('/oauthurl/spotify', async (req, res, next) => {
  try {
    const {state = 'app'} = req.query;
    if (state === 'admin') spotify.setRedirectURI(admin_redirect_uri);
    else spotify.setRedirectURI(app_redirect_uri);

    const url = spotify.createAuthorizeURL(
      ['ugc-image-upload', 'playlist-read-private', 'playlist-modify-private'],
      state as string,
    );

    spotify.resetRedirectURI();

    res.send(url);
  } catch (error) {
    next(error);
  }
});

router.post('/token/swap', async (req, res, next) => {
  try {
    const {code, state = 'app'} = req.body;

    if (state === 'admin') spotify.setRedirectURI(admin_redirect_uri);
    else spotify.setRedirectURI(app_redirect_uri);

    const {body, statusCode} = await spotify.authorizationCodeGrant(code);

    spotify.setAccessToken(body.access_token);
    const me = await spotify.getMe();
    try {
      await admin.firestore().collection('user').doc(me.body.id).create({
        type: 'spotify',
      });
    } catch (error) {
      await admin.firestore().collection('user').doc(me.body.id).update({
        type: 'spotify',
      });
    }
    spotify.resetRedirectURI();
    res.status(statusCode).json(body);
  } catch (error) {
    next(error);
  }
});

router.post('/token/refresh', async (req, res, next) => {
  try {
    const {refresh_token} = req.body;
    spotify.setRefreshToken(refresh_token);
    const {body, statusCode} = await spotify.refreshAccessToken();
    res.status(statusCode).json(body);
  } catch (error) {
    next(error);
  }
});

export default router;
