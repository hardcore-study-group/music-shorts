import {UserRecord} from 'firebase-admin/lib/auth/user-record';
import {admin} from '..';
import {CreateFirebaseAccountUserData} from '../../../../type/service/firebase';

export const createFirebaseAccount = async (
  userData: CreateFirebaseAccountUserData,
) => {
  const {accessToken, refreshToken, email, uid} = userData;

  let user: UserRecord;

  await Promise.all([
    (async () => {
      // Save the access token to the firestore
      const userSnapshot = await admin
        .firestore()
        .collection('user')
        .doc(uid)
        .get();
      if (userSnapshot.exists)
        await userSnapshot.ref.update({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      else
        await userSnapshot.ref.set({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
    })(),
    (async () => {
      // Create or update the user account.
      try {
        user = await admin.auth().updateUser(uid, {
          email,
          emailVerified: true,
        });
      } catch (_error) {
        const error = _error as any;
        // If user does not exists we create it.
        if (error.errorInfo.code !== 'auth/user-not-found') throw error;
        user = await admin.auth().createUser({
          uid,
          email,
          emailVerified: true,
        });
      }
    })(),
  ]);

  // @ts-ignore
  return user;
};
