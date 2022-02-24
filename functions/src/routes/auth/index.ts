import {Router} from 'express';
import {spotify} from '../../config/spotify';

const router = Router();

router.get('/token/swap', async (req, res) => {
  try {
    const {code} = req.body;
    const {body, statusCode} = await spotify.authorizationCodeGrant(code);
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
    res.status(statusCode).json(body);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
