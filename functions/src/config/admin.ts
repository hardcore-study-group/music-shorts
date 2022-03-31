import {config} from 'firebase-functions';

export const ADMIN_PASSWORD =
  process.env.NODE_ENV === 'test' ? '123456' : config().admin.password;
