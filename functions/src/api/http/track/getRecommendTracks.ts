import {firestore} from "firebase-admin";
import * as functions from "firebase-functions";


export const getRecommendTracks = functions.https.onCall(async (data, context) => {
  const snapshot = await firestore()
      .collection("tracks")
      .get();

  return snapshot.docs.map((v) => ({id: v.id, ...v.data()}));
});
