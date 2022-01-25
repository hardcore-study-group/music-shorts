import {admin} from '..';
import {User} from '../../../../type/firestore';
import {spotify} from '../../spotify';

export const getAccessToken = async (uid: string) => {
  const snapshot = await admin.firestore().collection('user').doc(uid).get();
  const user = snapshot.data() as User;
  if (!user.refresh_token) throw new Error("User don't have refreshToken");
  spotify.setRefreshToken(user.refresh_token);
  const result = await spotify.refreshAccessToken();
  return result.body.access_token;
};
