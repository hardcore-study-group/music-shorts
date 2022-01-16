import {admin} from '..';
import {CreateFirebaseAccountUserData} from '../../../../type/service/firebase';

export const createFirebaseAccount = async (
  userData: CreateFirebaseAccountUserData,
) => {
  const {accessToken, refreshToken, email, uid} = userData;

  await Promise.all([
    (async () => {
      // Save the access token to the firestore
      const userSnapshot = await admin
        .firestore()
        .collection('user')
        .doc(uid)
        .get();
      if (userSnapshot.exists)
        await userSnapshot.ref.update({accessToken, refreshToken});
      else await userSnapshot.ref.set({accessToken, refreshToken});
    })(),
    (async () => {
      // Create or update the user account.
      try {
        await admin.auth().updateUser(uid, {
          email: email,
          emailVerified: true,
        });
      } catch (_error) {
        const error = _error as any;
        // If user does not exists we create it.
        if (error.code !== 'auth/user-not-found') throw error;
        await admin.auth().createUser({
          uid: uid,
          email: email,
          emailVerified: true,
        });
      }
    })(),
  ]);

  // Create a Firebase custom auth token.
  const token = await admin.auth().createCustomToken(uid);

  return token;
};
