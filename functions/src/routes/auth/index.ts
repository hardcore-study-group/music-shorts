import {Router} from 'express';
import {logger} from 'firebase-functions/v1';
import {admin} from '../../config/firebase';
import {spotify} from '../../config/spotify';

const router = Router();

router.post('/token/swap', async (req, res, next) => {
  try {
    const {code} = req.body;
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
    console.log(body);
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
    logger.log('refresh : ', body);
    res.status(statusCode).json(body);
  } catch (error) {
    next(error);
  }
});

export default router;
