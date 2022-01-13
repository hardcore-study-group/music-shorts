import chai, {should} from 'chai';
import {CreateFirebaseAccountUserData} from '../../type/service/firebase';
import {testAdmin, testFunctions} from '../index.test';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();

describe('service/firebase', () => {
  let service: {
    createFirebaseAccount: (
      userData: CreateFirebaseAccountUserData,
    ) => Promise<string>;
  };

  before(async () => {
    service = require('../../src/service/firebase');
  });

  // after(async () => {
  //   try {
  //     testFunctions.cleanup();
  //     // delete user
  //     await testAdmin.auth().deleteUser('test');
  //     return;
  //   } catch (error) {
  //     assert.throw(() => {
  //       throw error;
  //     });
  //   }
  // });

  describe('createFirebaseAccount', async () => {
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

    it('Compare to created firebase auth', () =>
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

    // it('Only update user when second time call function', async () => {
    //   try {
    //     // functions test
    //     const data = await service.createFirebaseAccount(USER_DATA_2);
    //     assert.typeOf(data, 'string', 'token type is a string');

    //     // firebase auth test
    //     const user = await testAdmin.auth().getUser(USER_DATA_2.uid);
    //     assert.equal(user.uid, USER_DATA_2.uid, 'uid');
    //     assert.equal(user.email, USER_DATA_2.email, 'email');
    //     assert.equal(user.displayName, USER_DATA_2.displayName, 'displayName');
    //     assert.equal(user.photoURL, USER_DATA_2.photoURL, 'photoUrl');

    //     // firestore data migration test
    //     const snapshot = await testAdmin
    //       .firestore()
    //       .collection('user')
    //       .doc(USER_DATA_2.uid)
    //       .get();
    //     const userData = snapshot.data();
    //     if (!userData) throw new Error('No userData');
    //     assert.equal(
    //       userData.accessToken,
    //       USER_DATA_2.accessToken,
    //       'accessToken',
    //     );
    //   } catch (error) {
    //     return error;
    //   }
    // }).timeout(5000);
  });
});
