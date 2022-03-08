import {Router} from 'express';
import {admin} from '../../config/firebase';
import adminRequire from '../../middleware/adminRequire';
import loginRequire from '../../middleware/loginRequire';

import recommendation from './recomendation';

const router = Router();

router.use('/recomendation', recommendation);

router.get('/', loginRequire, adminRequire, async (req, res, next) => {
  try {
    const offset = Number(req.query.offset || 0);
    const limit = Number(req.query.limit || 10);
    const snapshot = await admin
      .firestore()
      .collection('track')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset)
      .get();
    res.json(snapshot.docs.map(v => ({...v.data(), id: v.id})));
  } catch (error) {
    next(error);
  }
});

router.post('/', loginRequire, adminRequire, (req, res, next) => {
  try {
    res.json();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', loginRequire, adminRequire, async (req, res, next) => {
  try {
    const {id} = req.params;

    await admin.firestore().collection('track').doc(id).delete();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
