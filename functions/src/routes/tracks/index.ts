import {Router} from 'express';
import {firestore} from 'firebase-admin';
import {admin} from '../../config/firebase';
import {spotify} from '../../config/spotify';
import adminRequire from '../../middleware/adminRequire';
import loginRequire from '../../middleware/loginRequire';
import {Track} from '../../types/firestore';

import recommendation from './recommendation';

const router = Router();

router.use('/recommendation', recommendation);

router.get('/', loginRequire, async (req, res, next) => {
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

router.post('/', loginRequire, adminRequire, async (req, res, next) => {
  try {
    const {spotifyTrackId} = req.body;

    const result = await spotify.getTrack(spotifyTrackId as string);
    const spotifyTrack = result.body;
    // this service must have "preview_url"
    if (!spotifyTrack.preview_url)
      res.status(403).send('This track doesn\'t have "preview_url"');
    // check already exists
    const prevSpotifyTrack = await admin
      .firestore()
      .collection('track')
      .where('spotify_id', '==', spotifyTrack.id)
      .get();

    if (prevSpotifyTrack.size !== 0) res.status(409).send('Already added');

    const snapshot = await admin
      .firestore()
      .collection('track')
      .add({
        created_at: firestore.Timestamp.now(),
        spotify_id: spotifyTrack.id,
        artist_names: spotifyTrack.artists.map(v => v.name),
        name: spotifyTrack.name,
        duration_ms: spotifyTrack.duration_ms,
        preview_url: spotifyTrack.preview_url,
        image: spotifyTrack.album.images[0].url,
        add_user_id: req.me.id,
        spotify_data: spotifyTrack,
      } as Track);

    const track = (await snapshot.get()).data();

    res.status(201).json(track);
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
