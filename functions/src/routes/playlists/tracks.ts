import {Router} from 'express';
import {firestore} from 'firebase-admin';
import {admin} from '../../config/firebase';
import loginRequire from '../../middleware/loginRequire';

const router = Router();

router.post('/', loginRequire, async (req, res) => {
  try {
    const {track_id} = req.body;

    const trackSnapshot = await admin
      .firestore()
      .collection('track')
      .doc(track_id)
      .get();

    if (!trackSnapshot.exists) res.status(400).send('Invalid track_id');

    const prevTrack = await admin
      .firestore()
      .collection('user')
      .doc(req.me.id)
      .collection('playlist')
      .doc(trackSnapshot.id)
      .get();
    if (prevTrack.exists)
      res.status(400).send('Track is already exists on playlist');

    await admin
      .firestore()
      .collection('user')
      .doc(req.me.id)
      .collection('playlist')
      .doc(trackSnapshot.id)
      .set({
        track: trackSnapshot.data(),
        added_at: firestore.Timestamp.now(),
      });

    const track = await admin
      .firestore()
      .collection('user')
      .doc(req.me.id)
      .collection('playlist')
      .doc(trackSnapshot.id)
      .get();

    res.status(201).json({...track.data(), id: track.id});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', loginRequire, async (req, res) => {
  try {
    const {id} = req.params;

    await admin
      .firestore()
      .collection('user')
      .doc(req.me.id)
      .collection('playlist')
      .doc(id)
      .delete();

    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
