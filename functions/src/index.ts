import express from 'express';
import {https} from 'firebase-functions';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import errorLogger from './config/errorLogger';
// ----------------- routes ----------------- //
import search from './routes/search';
import tracks from './routes/tracks';
import auth from './routes/auth';
import me from './routes/me';
import albums from './routes/albums';

// ----------------- routes ----------------- //

export const app = express();
// --------------- middlewares -------------- //
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors({origin: '*'}));
// ----------------- swagger ---------------- //
if (process.env.NODE_ENV !== 'test') {
  app.use(swaggerUi.serve);
  app.use('/docs', swaggerUi.setup(require('./config/swagger').specs));
}

// ----------------- routes ----------------- //
app.get('/isrunning', (req, res) => res.send('Server is running!!!')); // health checker
app.use('/search', search);
app.use('/auth', auth);
app.use('/tracks', tracks);
app.use('/me', me);
app.use('/albums', albums);
// ----------------- error handler ----------------- //
app.use(errorLogger);

export const api = https.onRequest(app);
