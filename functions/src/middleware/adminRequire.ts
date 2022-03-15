import {RequestHandler} from 'express';
import {admin} from '../config/firebase';

const adminRequire: RequestHandler = async (req, res, next) => {
  try {
    const userSnapshot = await admin
      .firestore()
      .collection('user')
      .doc(req.me.id)
      .get();
    const user = userSnapshot.data();
    if (!user?.is_admin) throw new Error();
    next();
  } catch (error) {
    res.status(403).send('Permission deny, admin only');
  }
};

export default adminRequire;
