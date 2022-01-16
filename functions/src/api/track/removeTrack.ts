import {https} from 'firebase-functions';
import {HttpsError} from 'firebase-functions/v1/https';
import {GetTracksData, RemoveTrackData} from '../../../type/api/track';
import {admin, adminGuard} from '../../service/firebase';

export const removeTrack = https.onCall(
  async (data: RemoveTrackData, context) => {
    const {id} = data;

    if (!context.auth)
      throw new HttpsError('unauthenticated', 'Sign in require');
    await adminGuard(context.auth.uid);

    await admin.firestore().collection('track').doc(id).delete();

    return;
  },
);
