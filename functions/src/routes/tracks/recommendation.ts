import {Router} from 'express';
import {firestore} from 'firebase-admin';
import {admin} from '../../config/firebase';
import loginRequire from '../../middleware/loginRequire';
import {Track} from '../../types/firestore';

const router = Router();

router.get('/', loginRequire, async (req, res, next) => {
  try {
    const calledTrackIds = await admin
      .firestore()
      .collection('user')
      .doc(req.me.id)
      .get()
      .then(snapshot => snapshot.data()?.called_track_ids || []);
    // const calledTrackIds: string[] = [];
    let result: (Track & {id: string})[] = [];
    const get100Tracks = () => {
      let count = 0;
      return () => {
        count += 1;
        return admin
          .firestore()
          .collection('track')
          .orderBy('created_at', 'desc')
          .offset((count - 1) * 100)
          .get();
      };
    };

    const getTracks = get100Tracks();
    while (result.length < 3) {
      const tracks = await getTracks();
      if (!tracks.size) break;

      const notCalledTracks = tracks.docs.filter(
        doc => !calledTrackIds.includes(doc.id),
      );
      const trackData = notCalledTracks.map(
        v => ({...v.data(), id: v.id} as any),
      );
      result.push(...trackData);
    }

    result = result.slice(0, 3);

    // caching
    if (result.length) {
      await admin
        .firestore()
        .collection('user')
        .doc(req.me.id)
        .update({
          called_track_ids: firestore.FieldValue.arrayUnion(
            ...result.map(v => v.id),
          ),
        });
    } else {
      // if no more tracks clear cache
      result = (await get100Tracks()()).docs
        .map(v => ({...v.data(), id: v.id} as any))
        .slice(0, 3);
      await admin
        .firestore()
        .collection('user')
        .doc(req.me.id)
        .update({
          called_track_ids: result.map(v => v.id),
        });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
