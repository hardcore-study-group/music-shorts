import {Router} from 'express';
import {admin} from '../../config/firebase';
import {spotify} from '../../config/spotify';

const router = Router();

router.post('/token/swap', async (req, res, next) => {
  try {
    const {code} = req.body;
    const {body, statusCode} = await spotify.authorizationCodeGrant(code);
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
