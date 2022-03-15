import {ErrorRequestHandler} from 'express';

const errorLogger: ErrorRequestHandler = async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'test') console.log(err);
  else require('firebase-functions/v1').logger.error(err);
  res.status(500).json(err);
};

export default errorLogger;
