import {Router} from 'express';
import {spotify} from '../../config/spotify';
import loginRequire from '../../middleware/loginRequire';
import playlistRequire from '../../middleware/playlistRequire';

const router = Router();

router.get('/', loginRequire, playlistRequire, async (req, res, next) => {
  try {
    res.status(200).json({...req.me, playlist_id: req.playlist_id});
  } catch (error) {
    next(error);
  }
});

router.get(
  '/playlist/tracks',
  loginRequire,
  playlistRequire,
  async (req, res, next) => {
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
      next(error);
    }
  },
);

router.post(
  '/playlist/tracks',
  loginRequire,
  playlistRequire,
  async (req, res, next) => {
    try {
      const {track_id} = req.body;
      const {body, statusCode} = await spotify.addTracksToPlaylist(
        req.playlist_id,
        [`spotify:track:${track_id}`],
        {position: 0},
      );
      res.status(statusCode).json(body);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/playlist/tracks/:id',
  loginRequire,
  playlistRequire,
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const {body, statusCode} = await spotify.removeTracksFromPlaylist(
        req.playlist_id,
        [{uri: `spotify:track:${id}`}],
      );
      res.status(statusCode).json(body);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
