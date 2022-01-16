import {CloudFunction} from 'firebase-functions/v1';
import {SearchTracksData} from '../../type/api/search';
import setup from '../hook/setup';

describe('api/search', () => {
  const {testAdmin, testFunctions} = setup();

  let Functions: {
    searchTracks: CloudFunction<Promise<any>>;
  };

  before(() => {
    Functions = require('../../src/api/search');
  });

  describe('searchTracks', () => {
    it('will be return ', () =>
      testFunctions.wrap(Functions.searchTracks)({
        query: 'just two of us',
      } as SearchTracksData)).should.be.has.property('items', '');
  });
});
