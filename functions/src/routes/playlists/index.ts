import {Router} from 'express';
import {admin} from '../../config/firebase';
import loginRequire from '../../middleware/loginRequire';
import tracks from './tracks';

const router = Router();

router.use('tracks', tracks);

router.get('/', loginRequire, async (req, res) => {
  try {
    const snapshot = await admin
      .firestore()
      .collection('user')
      .doc(req.me.id)
      .collection('playlist')
      .orderBy('added_at', 'desc')
      .limit(100)
      .get();
    const result = snapshot.docs.map(v => ({...v.data(), id: v.id}));
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
