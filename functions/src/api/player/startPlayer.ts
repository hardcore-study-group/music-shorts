import {https} from 'firebase-functions';
import {HttpsError} from 'firebase-functions/v1/https';
import {StartPlayerData} from '../../../type/api/player';
import {admin, getAccessToken} from '../../service/firebase';
import {spotify} from '../../service/spotify';

export const startPlayer = https.onCall(
  async (data: StartPlayerData, context) => {
    const {deviceId, trackId, shuffle = false} = data;
    if (!context.auth)
      throw new HttpsError('unauthenticated', 'sign in require');

    const snapshot = await admin
      .firestore()
      .collection('user')
      .doc(context.auth.uid)
      .collection('playlist')
      .orderBy('added_at', 'desc')
      .limit(100)
      .get();

    const uris = snapshot.docs.map(v => v.data().spotify_id);
    const currentUri = snapshot.docs
      .find(v => v.id === trackId)
      ?.data().spotify_id;

    const accessToken = await getAccessToken(context.auth.uid);
    spotify.setAccessToken(accessToken);
    try {
      await spotify.play({
        device_id: deviceId,
        uris,
        offset: {uri: currentUri},
      });
    } catch (_error) {
      const error = _error as any;
      if (error.body.reason === 'PREMIUM_REQUIRED')
        throw new HttpsError('permission-denied', 'spotify premium required');
      throw error;
    }

    return;
  },
);
