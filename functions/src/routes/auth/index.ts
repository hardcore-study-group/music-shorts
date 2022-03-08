import {Router} from 'express';
import {admin} from '../../config/firebase';
import {spotify, spotifyAdmin} from '../../config/spotify';

const router = Router();

router.get('/oauthurl/spotify', async (req, res, next) => {
  try {
    const url = spotifyAdmin.createAuthorizeURL(['user-read-email'], 'admin');
    res.send(url);
  } catch (error) {
    next(error);
  }
});

router.post('/token/swap', async (req, res, next) => {
  try {
    const {code, state} = req.body;
    const _spotify = state === 'admin' ? spotifyAdmin : spotify;
    const {body, statusCode} = await _spotify.authorizationCodeGrant(code);
    // init user
    _spotify.setAccessToken(body.access_token);
    const me = await _spotify.getMe();
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
    console.log(refresh_token);
    const {body, statusCode} = await spotify.refreshAccessToken();
    res.status(statusCode).json(body);
  } catch (error) {
    next(error);
  }
});

export default router;
