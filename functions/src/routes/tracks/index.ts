import {Router} from 'express';
import {firestore} from 'firebase-admin';
import musicDeveloper from '../../config/apple';
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

router.post('/', async (req, res, next) => {
  try {
    // ------------ params ------------ //
    const {apple_id, spotify_id} = req.body;

    // ------------ spotify ------------ //
    const {
      body: {access_token},
    } = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(access_token);
    const result = await spotify.getTrack(spotify_id as string);
    const spotifyTrack = result.body;

    if (result.statusCode !== 200) {
      res.status(result.statusCode).json(result.body);
      return;
    }

    // ------------ apple ------------ //
    const {data, status} = await musicDeveloper(`/songs/${apple_id}`);
    const appleTrack = data.data[0];
    if (status !== 200) {
      res.status(status).json(data);
      return;
    }
    if (appleTrack.attributes.previews.length === 0) {
      res.status(403).send('apple music preview_url require');
      return;
    }

    // ------------ check exist ------------ //
    const prevSpotifyTrack = await admin
      .firestore()
      .collection('track')
      .where('spotify_id', '==', spotifyTrack.id)
      .get();
    const prevAppleTrack = await admin
      .firestore()
      .collection('track')
      .where('apple_id', '==', appleTrack.id)
      .get();
    if (prevSpotifyTrack.size !== 0) {
      res.status(409).send('spotify already added');
      return;
    }
    if (prevAppleTrack.size !== 0) {
      res.status(409).send('apple already added');
      return;
    }

    // ------------ Create to firestore ------------ //
    const snapshot = await admin
      .firestore()
      .collection('track')
      .add({
        created_at: firestore.Timestamp.now(),
        artist_names: spotifyTrack.artists.map(v => v.name),
        name: spotifyTrack.name,
        image: appleTrack.attributes.artwork.url
          .replace('{w}', 1024)
          .replace('{h}', 1024),
        // add_user_id: req.me.id,
        // climax_file_name: fileName,
        preview_url: appleTrack.attributes.previews[0].url,
        spotify_id: spotifyTrack.id,
        apple_id: appleTrack.id,
        spotify_data: spotifyTrack,
        apple_data: appleTrack,
      } as Track);

    // ------------ Send result ------------ //
    const track = await snapshot.get();
    res.status(201).json({...track.data(), id: track.id});
  } catch (error) {
    console.log(error);
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
