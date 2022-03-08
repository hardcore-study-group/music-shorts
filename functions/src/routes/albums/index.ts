import {Router} from 'express';
import {spotify} from '../../config/spotify';
import loginRequire from '../../middleware/loginRequire';

const router = Router();

router.get('/:id', loginRequire, async (req, res, next) => {
  try {
    const {statusCode, body} = await spotify.getAlbum(req.params.id);
    res.status(statusCode).json(body);
  } catch (error) {
    next(error);
  }
});

export default router;
