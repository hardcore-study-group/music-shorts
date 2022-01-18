import {CloudFunction} from 'firebase-functions/v1';

describe('api/track', () => {
  let Functions: {
    addTrack: CloudFunction<Promise<any>>;
    getRecommendTracks: CloudFunction<Promise<any>>;
    getTracks: CloudFunction<Promise<any>>;
    removeTrack: CloudFunction<Promise<any>>;
  };

  before(function () {
    Functions = require('../../src/api/track');
  });
});
