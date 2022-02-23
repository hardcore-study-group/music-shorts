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

export {};
