import {CreateFirebaseAccountUserData} from '../../type/service/firebase';
import {testAdmin} from '../index.test';

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
      it('Clear firebase auth', () =>
        testAdmin.auth().deleteUser('test').should.be.fulfilled);

      it('Check user deleted', () =>
        testAdmin.auth().getUser('test').should.be.rejected);
    }),
  );

  describe('createFirebaseAccount', () => {
    const USER_DATA_1: CreateFirebaseAccountUserData = {
      accessToken: 'test_token',
      displayName: 'test',
      email: 'test@gmail.com',
      photoURL: 'https://dummyimage.com/512x512.png',
      uid: 'test',
    };

    const USER_DATA_2: CreateFirebaseAccountUserData = {
      accessToken: 'test_token_2',
      displayName: 'test_2',
      email: 'test2@gmail.com',
      photoURL: 'https://dummyimage.com/512x512.jpg',
      uid: 'test',
    };

    it('Create user when first time call function', () =>
      service
        .createFirebaseAccount(USER_DATA_1)
        .should.eventually.be.a('string')).timeout(5000);

    it('Compare with created firebase auth', () =>
      testAdmin
        .auth()
        .getUser(USER_DATA_1.uid)
        .should.eventually.be.have.deep.include({
          email: USER_DATA_1.email,
          displayName: USER_DATA_1.displayName,
          photoURL: USER_DATA_1.photoURL,
        }));

    it('Check accessToken', () =>
      testAdmin
        .firestore()
        .collection('user')
        .doc(USER_DATA_1.uid)
        .get()
        .then(snapshot => snapshot.data()?.accessToken)
        .should.eventually.be.to.equal(USER_DATA_1.accessToken));

    it('Update user when second time call function', () =>
      service
        .createFirebaseAccount(USER_DATA_2)
        .should.eventually.be.a('string')).timeout(5000);

    it('Compare with updated firebase auth', () =>
      testAdmin
        .auth()
        .getUser(USER_DATA_2.uid)
        .should.eventually.be.have.deep.include({
          email: USER_DATA_2.email,
          displayName: USER_DATA_2.displayName,
          photoURL: USER_DATA_2.photoURL,
        }));
    it('Check updated accessToken', () =>
      testAdmin
        .firestore()
        .collection('user')
        .doc(USER_DATA_2.uid)
        .get()
        .then(snapshot => snapshot.data()?.accessToken)
        .should.eventually.be.to.equal(USER_DATA_2.accessToken));
  });
});
