import {firestore} from 'firebase-admin';
import {https} from 'firebase-functions';
import {HttpsError} from 'firebase-functions/v1/https';
import {GetRecommendTracks} from '../../../type/api/track';
import {Track} from '../../../type/firestore';

export const getRecommendTracks = https.onCall(
  async (data: GetRecommendTracks, context) => {
    // no login user instaed to random id
    const id = context.auth?.uid || data.anonymouseId;
    if (!id) throw new HttpsError('invalid-argument', 'anonymouseId requie');

    const calledTrackIds: string[] = context.auth
      ? await firestore()
          .collection('user')
          .doc(id)
          .get()
          .then(snapshot => snapshot.data()?.called_track_ids || [])
      : await firestore()
          .collection('guest')
          .doc(id)
          .get()
          .then(async snapshot => {
            if (snapshot.exists) return snapshot.data()?.called_track_ids || [];
            // create guest user
            await firestore().collection('guest').doc(id).create({
              called_track_ids: [], // insert data
            });
            // return defulat data
            return [];
          });

    let result: (Track & {id: string})[] = [];
    const getTracks = get100Tracks();
    while (result.length < 3) {
      const tracks = await getTracks();
      if (tracks.size === 0) break;

      const notCalledTracks = tracks.docs.filter(
        doc => !calledTrackIds.includes(doc.id),
      );
      const trackData = notCalledTracks.map(
        v => ({...v.data(), id: v.id} as any),
      );
      result.push(...trackData);
    }

    result = result.slice(0, 3);

    // cache called
    if (result.length) {
      await firestore()
        .collection(context.auth ? 'user' : 'guest')
        .doc(id)
        .update({
          called_track_ids: firestore.FieldValue.arrayUnion(
            ...result.map(v => v.id),
          ),
        });
    }

    return result;
  },
);

const get100Tracks = () => {
  let count = 0;
  return () => {
    count += 1;
    return firestore()
      .collection('track')
      .orderBy('created_at', 'desc')
      .offset((count - 1) * 100)
      .get();
  };
};
