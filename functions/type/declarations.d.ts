import {ContextOptions} from 'firebase-functions-test/lib/main';
import {CloudFunction} from 'firebase-functions/v1';
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      FIREBASE_TEST_PROJECT_ID: string;
      SPOTIFY_TEST_CLIENT_ID: string;
      SPOTIFY_TEST_SECRET: string;
      SPOTIFY_TEST_ACCOUNT_ID: string;
      SPOTIFY_TEST_ACCOUNT_PASSWORD: string;
    }
  }
}

declare module 'firebase-functions-test/lib/features' {
  interface FeaturesList {
    wrap<T>(
      cloudFunction: CloudFunction<T>,
    ): (data?: any, options?: ContextOptions) => Promise<T>;
  }
}

export {};
