import {RequestHandler} from 'express';
import {spotify} from '../config/spotify';
import fs from 'fs/promises';
import {admin} from '../config/firebase';
import {User} from '../types/firestore';

const createPlaylist = async () => {
  const {
    body: {id},
  } = await spotify.createPlaylist('Music shorts', {
    public: false,
    collaborative: false,
    description: 'Musics added by app "Music shorts"',
  });
  const base64 = await fs.readFile('src/assets/icon.png', 'base64');
  await spotify.uploadCustomPlaylistCoverImage(id, base64);
  return id;
};

const playlistRequire: RequestHandler = async (req, res, next) => {
  try {
    // get user info from firestore
    const snapshot = await admin
      .firestore()
      .collection('user')
      .doc(req.me.id)
      .get();
    const user = snapshot.data() as User;
    // user doesn't have playlist_id
    if (!user.playlist_id) {
      // create playlist
      req.playlist_id = await createPlaylist();
    } else {
      // check exist playlist
      const {statusCode} = await spotify.getPlaylist(user.playlist_id);
      if (statusCode === 200) req.playlist_id = user.playlist_id;
      // when invlaid id create again
      else req.playlist_id = await createPlaylist();
    }
    // migrate to firestore
    await admin.firestore().collection('user').doc(req.me.id).update({
      playlist_id: req.playlist_id,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default playlistRequire;
