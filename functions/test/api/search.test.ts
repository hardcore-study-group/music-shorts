import {expect} from 'chai';
import {CloudFunction} from 'firebase-functions/v1';
import {SearchTracksData} from '../../type/api/search';
import {testFunctions} from '../setup.test';

describe('api/search', () => {
  let Functions: {
    searchTracks: CloudFunction<Promise<{items: any}>>;
  };

  before(() => {
    Functions = require('../../src/api/search');
  });

  describe('searchTracks', () => {
    it('will be return ', async () => {
      const result = await testFunctions.wrap(Functions.searchTracks)({
        query: 'just two of us',
      } as SearchTracksData);
      expect(result).to.be.has.property('items', '');
    });
  });
});
