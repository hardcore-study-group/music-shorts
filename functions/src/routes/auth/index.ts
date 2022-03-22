import {Router} from 'express';
import {admin} from '../../config/firebase';
import {spotify} from '../../config/spotify';

const router = Router();

router.get('/oauthurl/spotify', async (req, res, next) => {
  try {
    const {state} = req.query;
    const url = spotify.createAuthorizeURL(
      ['ugc-image-upload', 'playlist-read-private', 'playlist-modify-private'],
      state as string,
    );
    res.send(url);
  } catch (error) {
    next(error);
  }
});

router.post('/token/swap', async (req, res, next) => {
  try {
    const {code, state} = req.body;
    const {body, statusCode} = await spotify.authorizationCodeGrant(code);
    // init user
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
