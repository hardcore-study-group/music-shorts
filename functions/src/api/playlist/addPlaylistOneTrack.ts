import {firestore} from 'firebase-admin';
import {https} from 'firebase-functions';
import {HttpsError} from 'firebase-functions/v1/https';
import {AddPlaylistOneTrackData} from '../../../type/api/playlist';
import {admin} from '../../service/firebase';

export const addPlaylistOneTrack = https.onCall(
  async (data: AddPlaylistOneTrackData, context) => {
    const {trackId} = data;

    if (!context.auth)
      throw new HttpsError('unauthenticated', 'Sign in require');

    const trackSnapshot = await admin
      .firestore()
      .collection('track')
      .doc(trackId)
      .get();

    if (!trackSnapshot.exists)
      throw new HttpsError('invalid-argument', 'Invalid track');

    const snapshot = await admin
      .firestore()
      .collection('user')
      .doc(context.auth.uid)
      .collection('playlist')
      .add({
        track: trackSnapshot.data(),
        addedAt: firestore.Timestamp.now(),
      });

    return (await snapshot.get()).data();
  },
);
