import {https} from 'firebase-functions';

interface Data {
  spotifyCode: string;
}

export const getSpotifyFirebaseCustomToken = https.onCall(
  async (data: Data, context) => {
    return;
  },
);
