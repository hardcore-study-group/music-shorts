import {expect} from 'chai';
import {CreateFirebaseAccountUserData} from '../../type/service/firebase';
import {testAdmin} from '../setup.test';

describe('service/firebase', () => {
  let service: {
    createFirebaseAccount: (
      userData: CreateFirebaseAccountUserData,
    ) => Promise<string>;
  };

  before(async () => {
    service = require('../../src/service/firebase');
  });

  after(() =>
    describe('Clear firebase auth test data', () => {
      it('Clear firebase auth', async () => {
        const result = await testAdmin
          .auth()
          .deleteUser('test')
          .catch((e: any) => e);
        expect(result).not.be.a('error');
      });

      it('Check user deleted', async () => {
        const result = await testAdmin
          .auth()
          .getUser('test')
          .catch((e: any) => e);
        expect(result).to.be.a('error');
      });
    }),
  );

  describe('createFirebaseAccount', () => {
    const USER_DATA_1: CreateFirebaseAccountUserData = {
      accessToken: 'test_access_token',
      refreshToken: 'test_refresh_token',
      email: 'test@gmail.com',
      uid: 'test',
    };

    const USER_DATA_2: CreateFirebaseAccountUserData = {
      accessToken: 'test_access_token_2',
      refreshToken: 'test_refresh_token_2',
      email: 'test2@gmail.com',
      uid: 'test',
    };

    it('Create user when first time call function', async () => {
      const user = await service.createFirebaseAccount(USER_DATA_1);
      expect(user).to.has.property('uid');
    });

    it('Compare with created firebase auth', async () => {
      const user = await testAdmin.auth().getUser(USER_DATA_1.uid);
      expect(user).to.have.deep.include({
        email: USER_DATA_1.email,
      });
    });

    it('Check accessToken', async () => {
      const access_token = await testAdmin
        .firestore()
        .collection('user')
        .doc(USER_DATA_1.uid)
        .get()
        .then(snapshot => snapshot.data()?.access_token);
      expect(access_token).to.equal(USER_DATA_1.accessToken);
    });

    it('Update user when second time call function', async () => {
      const user = await service.createFirebaseAccount(USER_DATA_2);
      expect(user).to.has.property('uid');
    });

    it('Compare with updated firebase auth', async () => {
      const user = await testAdmin.auth().getUser(USER_DATA_2.uid);
      expect(user).to.have.deep.include({
        email: USER_DATA_2.email,
      });
    });

    it('Check updated accessToken', async () => {
      const accessToken = await testAdmin
        .firestore()
        .collection('user')
        .doc(USER_DATA_2.uid)
        .get()
        .then(snapshot => snapshot.data()?.access_token);
      expect(accessToken).to.equal(USER_DATA_2.accessToken);
    });
  });
});
