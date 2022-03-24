import {RequestHandler} from 'express';
import {admin} from '../config/firebase';

const adminRequire: RequestHandler = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(403).send('Permission deny, admin only');
  }
};

export default adminRequire;
