import {UserRecord} from 'firebase-admin/lib/auth/user-record';
import {testAdmin} from './setup.test';

const TEST_USER_ID = 'TEST_USER';

export const createTestUser = async () => {
  let user: UserRecord;
  // get exist user or create user
  try {
    user = await testAdmin.auth().createUser({
      uid: TEST_USER_ID,
    });
  } catch (_error) {
    const error = _error as any;
    if (error.errorInfo.code !== 'auth/uid-already-exists') throw _error;
    user = await testAdmin.auth().getUser(TEST_USER_ID);
  }

  // Fill user data
  await testAdmin.firestore().collection('user').doc(user.uid).set({
    is_admin: true,
    refresh_token: 'test_refresh_token',
    access_token: 'test_access_token',
  });
  return user;
};

export const clearTestUser = async () => {
  try {
    await testAdmin.auth().deleteUser(TEST_USER_ID);
  } catch (_error) {
    const error = _error as any;
    if (error.errorInfo.code !== 'auth/user-not-found') throw _error;
  }
};
