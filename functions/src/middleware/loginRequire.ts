import {RequestHandler} from 'express';
import {spotify} from '../config/spotify';
import youtube from '../config/youtube';
import {Type} from '../types/firestore';

const loginRequire: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw Error('Login require');
    // if (!req.headers.type) throw Error('Header <type> require');
    let type = req.headers.type;
    switch (type) {
      case 'youtube':
        youtube.defaults.headers.common.Authorization =
          req.headers.authorization;
        break;
      case 'spotify':
      default: {
        const accessToken = req.headers.authorization.replace('Bearer ', '');
        spotify.setAccessToken(accessToken);
        type = 'spotify';
      }
    }
    req.type = type as Type;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

export default loginRequire;
