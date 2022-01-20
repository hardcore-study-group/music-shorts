import {HttpsError} from 'firebase-functions/v1/https';
import {admin} from '..';
import {User} from '../../../../type/firestore';

export const adminGuard = async (uid: string) => {
  const snapshot = await admin.firestore().collection('user').doc(uid).get();
  const data = snapshot.data() as User;
  // if (!data.is_admin) throw new HttpsError('permission-denied', 'Admin only');

  return data;
};
