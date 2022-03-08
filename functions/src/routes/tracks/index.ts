import {Router} from 'express';
import adminRequire from '../../middleware/adminRequire';
import loginRequire from '../../middleware/loginRequire';

import recommendation from './recomendation';

const router = Router();

router.use('/recomendation', recommendation);

router.get('/', loginRequire, adminRequire, (req, res, next) => {
  try {
    console.log();
  } catch (error) {
    next(error);
  }
});

router.post('/', loginRequire, adminRequire, (req, res, next) => {
  try {
    console.log();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', loginRequire, adminRequire, (req, res, next) => {
  try {
    console.log();
  } catch (error) {
    next(error);
  }
});

export default router;
