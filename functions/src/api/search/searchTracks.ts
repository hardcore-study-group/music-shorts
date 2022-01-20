import {https} from 'firebase-functions';
import {HttpsError} from 'firebase-functions/v1/https';
import {SearchTracksData} from '../../../type/api/search';
import {getAccessToken} from '../../service/firebase';
import {spotify} from '../../service/spotify';

export const searchTracks = https.onCall(
  async (data: SearchTracksData, context) => {
    const {query, limit, offset} = data;
    if (!context.auth)
      throw new HttpsError('unauthenticated', 'Signin require');
    const accessToken = await getAccessToken(context.auth.uid);
    spotify.setAccessToken(accessToken);
    const {body} = await spotify.searchTracks(query, {limit, offset});
    return body.tracks;
  },
);
