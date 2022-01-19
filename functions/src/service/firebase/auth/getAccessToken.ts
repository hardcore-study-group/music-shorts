import {admin} from '..';
import {User} from '../../../../type/firestore';
import {spotify} from '../../spotify';

export const getAccessToken = async (uid: string) => {
  const snapshot = await admin.firestore().collection('user').doc(uid).get();
  const user = snapshot.data() as User;
  if (!user.refreshToken) throw new Error("User don't have refreshToken");
  spotify.setRefreshToken(user.refreshToken);
  const {body} = await spotify.refreshAccessToken();
  return body.access_token;
};
