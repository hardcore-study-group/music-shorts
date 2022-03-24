import {Type} from './firestore';

interface Response<T> {
  body: T;
  headers: Record<string, string>;
  statusCode: number;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      FIREBASE_TEST_PROJECT_ID: string;
      SPOTIFY_TEST_CLIENT_ID: string;
      SPOTIFY_TEST_SECRET: string;
    }
  }
}

declare module 'http' {
  interface IncomingHttpHeaders {
    access_token: string;
  }
  interface IncomingMessage {
    type: Type;
    playlist_id: string;
    device_id: string;
  }
}

export {};
