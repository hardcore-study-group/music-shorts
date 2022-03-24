import {Router} from 'express';
import {spotify} from '../../config/spotify';
import youtube from '../../config/youtube';

const router = Router();

router.get('/spotify', async (req, res, next) => {
  try {
    const {q}: any = req.query;
    // client access_token
    const {
      body: {access_token},
    } = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(access_token);
    const {body, statusCode} = await spotify.searchTracks(q, {limit: 5});

    res.status(statusCode).json(body);
  } catch (error) {
    next(error);
  }
});

router.get('/youtube', async (req, res, next) => {
  try {
    const {q}: any = req.query;

    const {data, status} = await youtube.get('search', {
      params: {
        part: 'snippet',
        q: q + ' " - Topic"',
      },
    });
    res.status(status).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
