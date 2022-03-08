import {Router} from 'express';
import {spotify} from '../../config/spotify';
import adminRequire from '../../middleware/adminRequire';
import loginRequire from '../../middleware/loginRequire';

const router = Router();

router.get('/', loginRequire, adminRequire, async (req, res, next) => {
  try {
    const {q}: any = req.query;
    const {body, statusCode} = await spotify.searchTracks(q, {limit: 15});
    res.status(statusCode).json(body);
  } catch (error) {
    next(error);
  }
});

export default router;
