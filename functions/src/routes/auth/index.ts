import {Router} from 'express';
import spotify from './spotify';
import youtube from './youtube';

const router = Router();

router.use('/spotify', spotify);
router.use('/youtube', youtube);

export default router;
