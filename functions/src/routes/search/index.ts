import {Router} from 'express';
import {spotify} from '../../config/spotify';
import musicDeveloper from '../../config/apple';

const router = Router();

router.get('/spotify', async (req, res, next) => {
  try {
    const {q}: any = req.query;
    // client access_token
    const {
      body: {access_token},
    } = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(access_token);
    const {body, statusCode} = await spotify.searchTracks(q, {limit: 15});

    res.status(statusCode).json(body);
  } catch (error) {
    next(error);
  }
});

router.get('/apple', async (req, res, next) => {
  try {
    const {q}: any = req.query;
    const term = q.replace(/ /gi, '+');
    const {data, status} = await musicDeveloper(
      `/catalog/US/search?types=songs&limit=15&term=${term}`,
    );
    res.status(status).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
