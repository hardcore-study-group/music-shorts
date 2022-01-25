import {firestore} from 'firebase-admin';
import {https} from 'firebase-functions';
import {HttpsError} from 'firebase-functions/v1/https';
import {AddTrackData} from '../../../type/api/track';
import {Track} from '../../../type/firestore';
import {admin, adminGuard, getAccessToken} from '../../service/firebase';
import {spotify} from '../../service/spotify';

export const addTrack = https.onCall(async (data: AddTrackData, context) => {
  const {spotifyTrackId} = data;

  if (!context.auth) throw new HttpsError('unauthenticated', 'Sign in require');
  await adminGuard(context.auth.uid);

  const accessToken = await getAccessToken(context.auth.uid);
  spotify.setAccessToken(accessToken);
  const result = await spotify.getTrack(spotifyTrackId);
  const spotifyTrack = result.body;
  // this service must have "preview_url"
  if (!spotifyTrack.preview_url)
    throw new HttpsError(
      'unavailable',
      'This track doesn\'t have property "preview_url"',
    );
  // check already exists
  const prevSpotifyTrack = await admin
    .firestore()
    .collection('track')
    .where('spotify_id', '==', spotifyTrack.id)
    .get();

  if (prevSpotifyTrack.size !== 0)
    throw new HttpsError('already-exists', 'Spotify track already exists');

  const snapshot = await admin
    .firestore()
    .collection('track')
    .add({
      created_at: firestore.Timestamp.now(),
      spotify_id: spotifyTrack.id,
      artist_names: spotifyTrack.artists.map(v => v.name),
      name: spotifyTrack.name,
      duration_ms: spotifyTrack.duration_ms,
      preview_url: spotifyTrack.preview_url,
      image: spotifyTrack.album.images[0].url,
      add_user_id: context.auth.uid,
      spotify_data: spotifyTrack,
    } as Track);

  const track = (await snapshot.get()).data();
  return {...track, id: snapshot.id};
});
