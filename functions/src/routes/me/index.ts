import {Router} from 'express';
import {spotify} from '../../config/spotify';
import loginRequire from '../../middleware/loginRequire';
import playlistRequire from '../../middleware/playlistRequire';

const router = Router();

router.get('/', loginRequire, async (req, res) => {
  try {
    const {body, statusCode} = await spotify.getMe();
    res.status(statusCode).json(body);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get(
  '/playlist/tracks',
  loginRequire,
  playlistRequire,
  async (req, res) => {
    try {
      const {limit = 30, offset = 0} = req.query;
      const {body, statusCode} = await spotify.getPlaylistTracks(
        req.playlist_id,
        {
          limit: Number(limit),
          offset: Number(offset),
        },
      );
      res.status(statusCode).json(body);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

router.post(
  '/playlist/tracks',
  loginRequire,
  playlistRequire,
  async (req, res) => {
    try {
      const {track_id} = req.body;
      const {body, statusCode} = await spotify.addTracksToPlaylist(
        req.playlist_id,
        track_id,
        {position: 0},
      );
      res.status(statusCode).json(body);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

router.delete(
  '/playlist/tracks/:id',
  loginRequire,
  playlistRequire,
  async (req, res) => {
    try {
      const {id} = req.params;
      const {body, statusCode} = await spotify.removeTracksFromPlaylist(
        req.playlist_id,
        [{uri: id}],
      );
      res.status(statusCode).json(body);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

export default router;
