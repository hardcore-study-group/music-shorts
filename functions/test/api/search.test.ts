import {expect} from 'chai';
import {CloudFunction} from 'firebase-functions/v1';
import {SearchTracksData} from '../../type/api/search';
import '../index.test';

describe('api/search', function () {
  let Functions: {
    searchTracks: CloudFunction<Promise<{items: any}>>;
  };

  before(function () {
    Functions = require('../../src/api/search');
  });

  describe('searchTracks', function () {
    it('will be return ', async function () {
      const result = await this.testFunctions.wrap(Functions.searchTracks)({
        query: 'just two of us',
      } as SearchTracksData);
      expect(result).to.be.has.property('items', '');
    });
  });
});
