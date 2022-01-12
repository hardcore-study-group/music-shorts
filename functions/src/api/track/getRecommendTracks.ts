import {firestore} from 'firebase-admin';
import {https} from 'firebase-functions';

export const getRecommendTracks = https.onCall(async (data, context) => {
  const snapshot = await firestore().collection('tracks').get();

  return snapshot.docs.map(v => ({id: v.id, ...v.data()}));
});
