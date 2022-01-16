import {https} from 'firebase-functions';
import {HttpsError} from 'firebase-functions/v1/https';
import {RemovePlaylistOneTrackData} from '../../../type/api/playlist';
import {admin} from '../../service/firebase';

export const addPlaylistOneTrack = https.onCall(
  async (data: RemovePlaylistOneTrackData, context) => {
    const {id} = data;

    if (!context.auth)
      throw new HttpsError('unauthenticated', 'Sign in require');

    await admin
      .firestore()
      .collection('user')
      .doc(context.auth.uid)
      .collection('playlist')
      .doc(id)
      .delete();

    return;
  },
);
