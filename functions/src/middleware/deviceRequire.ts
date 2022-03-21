import {RequestHandler} from 'express';
import {admin} from '../config/firebase';

const deviceRequire: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.device_id) throw Error();
    req.device_id = req.headers.device_id as string;

    await admin
      .firestore()
      .collection('device')
      .doc(req.device_id)
      .create({})
      .catch(() => 'user exist');

    next();
  } catch (error) {
    res.status(403).send('Permission deny, device require');
  }
};

export default deviceRequire;
