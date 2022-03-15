import {Router} from 'express';
import {spotify} from '../../config/spotify';
import loginRequire from '../../middleware/loginRequire';

const router = Router();

router.get('/', loginRequire, async (req, res, next) => {
  try {
    const {q}: any = req.query;
    const {body, statusCode} = await spotify.searchTracks(q, {limit: 15});
    res.status(statusCode).json(body);
  } catch (error) {
    next(error);
  }
});

export default router;
