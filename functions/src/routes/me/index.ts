import {Router} from 'express';
import {spotify} from '../../config/spotify';
import loginRequire from '../../middleware/loginRequire';

const router = Router();

router.get('/', loginRequire, async (req, res) => {
  try {
    const {body, statusCode} = await spotify.getMe();
    res.status(statusCode).json(body);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
