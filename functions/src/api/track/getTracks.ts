import {https} from 'firebase-functions';
import {GetTracksData} from '../../../type/api/track';
import {admin} from '../../service/firebase';

export const getTracks = https.onCall(async (data: GetTracksData, context) => {
  const {limit, offset} = data;
  const snapshot = await admin
    .firestore()
    .collection('track')
    .orderBy('created_at', 'desc')
    .limit(limit)
    .offset(offset)
    .get();
  return snapshot.docs.map(v => ({...v.data(), id: v.id}));
});
