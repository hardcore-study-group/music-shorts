import {Router} from 'express';
import {firestore} from 'firebase-admin';
import {admin} from '../../config/firebase';
import {spotify} from '../../config/spotify';
import youtubeMp3Downloader from '../../config/youtubeMp3Downloader';
import adminRequire from '../../middleware/adminRequire';
import loginRequire from '../../middleware/loginRequire';
import {Track} from '../../types/firestore';
import recommendation from './recommendation';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import os from 'os';

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
    // ------------ params ------------ //
    const {youtube_id, start_time, end_time, spotify_id} = req.body;

    // ------------ check already exist ------------ //
    const result = await spotify.getTrack(spotify_id as string);
    const spotifyTrack = result.body;
    const prevSpotifyTrack = await admin
      .firestore()
      .collection('track')
      .where('spotify_id', '==', spotifyTrack.id)
      .get();
    if (prevSpotifyTrack.size !== 0) {
      res.status(409).send('Already added');
      return;
    }

    // ------------ Extract mp3 from youtube ------------ //
    await new Promise((res, rej) => {
      youtubeMp3Downloader.download(youtube_id, 'temp1.mp3');
      youtubeMp3Downloader.on('finished', (error, data) => {
        if (error) rej(error);
        res(data);
      });
    });

    // ------------ Extract climax ------------ //
    await new Promise((res, rej) => {
      ffmpeg(path.join(os.tmpdir(), 'temp1.mp3'))
        .setStartTime(start_time)
        .duration(end_time - start_time)
        .save(path.join(os.tmpdir(), 'temp2.mp3'))
        .on('end', res)
        .on('error', rej);
      // .removeAllListeners();
    });
    // ------------ Upload to storage ------------ //
    const fileName = `${spotifyTrack.artists
      .map(v => v.name.replace(/\//gi, ''))
      .join(', ')} - ${spotifyTrack.name}.mp3`;
    await admin
      .storage()
      .bucket()
      .upload(path.join(os.tmpdir(), 'temp2.mp3'), {
        destination: `climax/${fileName}`,
      });

    // ------------ Create to firestore ------------ //
    const snapshot = await admin
      .firestore()
      .collection('track')
      .add({
        created_at: firestore.Timestamp.now(),
        spotify_id: spotifyTrack.id,
        artist_names: spotifyTrack.artists.map(v => v.name),
        name: spotifyTrack.name,
        duration_ms: spotifyTrack.duration_ms,
        image: spotifyTrack.album.images[0].url,
        add_user_id: req.me.id,
        climax_file_name: fileName,
        spotify_data: spotifyTrack,
      } as Track);

    // ------------ Remove uploaded files ------------ //
    fs.unlinkSync(path.join(os.tmpdir(), 'temp1.mp3'));
    fs.unlinkSync(path.join(os.tmpdir(), 'temp2.mp3'));

    // ------------ Send result ------------ //
    const track = await snapshot.get();
    res.status(201).json({...track.data(), id: track.id});
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
