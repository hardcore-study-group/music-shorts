import {https} from 'firebase-functions';

export const isRunning = https.onCall((request, response) => {
  return 'server is running';
});

export * from './api/auth';
export * from './api/player';
export * from './api/playlist';
export * from './api/search';
export * from './api/track';
