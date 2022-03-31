import {RequestHandler} from 'express';
import {ADMIN_PASSWORD} from '../config/admin';

const adminRequire: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw Error('Admin only');
    if (req.headers.authorization.split('Bearer ')[1] !== ADMIN_PASSWORD)
      throw Error('Invalid password');
    next();
  } catch (error) {
    res.status(403).send('Permission deny, admin only');
  }
};

export default adminRequire;
