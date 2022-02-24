import {Router} from 'express';
import {logger} from 'firebase-functions/v1';
import {spotify} from '../../config/spotify';

const router = Router();

router.post('/token/swap', async (req, res) => {
  try {
    const {code} = req.body;
    const {body, statusCode} = await spotify.authorizationCodeGrant(code);
    logger.log('swap : ', body);
    res.status(statusCode).json(body);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/token/refresh', async (req, res) => {
  try {
    const {refresh_token} = req.body;
    spotify.setRefreshToken(refresh_token);
    const {body, statusCode} = await spotify.refreshAccessToken();
    logger.log('refresh : ', body);
    res.status(statusCode).json(body);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
