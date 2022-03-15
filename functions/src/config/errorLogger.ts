import {ErrorRequestHandler} from 'express';
import {logger} from 'firebase-functions/v1';

const errorLogger: ErrorRequestHandler = async (err, req, res, next) => {
  logger.error(err);
  res.status(500).json(err);
};

export default errorLogger;
