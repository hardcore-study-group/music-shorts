import {RequestHandler} from 'express';
import {spotify} from '../config/spotify';
import youtube from '../config/youtube';

const loginRequire: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw Error('Login require');
    if (!req.headers.type) throw Error('Header <type> require');
    const type = req.headers.type;
    switch (type) {
      case 'spotify': {
        const accessToken = req.headers.authorization.replace('Bearer ', '');
        spotify.setAccessToken(accessToken);
        break;
      }
      case 'youtube':
        youtube.defaults.headers.common.Authorization =
          req.headers.authorization;
        break;
      default:
        throw new Error('Invalid type');
    }
    req.type = type;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

export default loginRequire;
