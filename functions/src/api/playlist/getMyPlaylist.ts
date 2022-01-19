import {https} from 'firebase-functions';
import {HttpsError} from 'firebase-functions/v1/https';
import {admin} from '../../service/firebase';

export const getMyPlaylist = https.onCall(async (data, context) => {
  if (!context.auth) throw new HttpsError('unauthenticated', 'Sign in require');
  const snapshot = await admin
    .firestore()
    .collection('user')
    .doc(context.auth.uid)
    .collection('playlist')
    .orderBy('added_at', 'desc')
    .limit(100)
    .get();
  return snapshot.docs.map(v => ({...v.data(), id: v.id}));
});
