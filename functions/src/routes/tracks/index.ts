import {Router} from 'express';

import recommendation from './recomendation';

const router = Router();

router.use('/recomendation', recommendation);

export default router;
