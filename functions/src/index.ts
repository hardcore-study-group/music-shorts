import express from 'express';
import {https} from 'firebase-functions';
import morgan from 'morgan';
// ----------------- routes ----------------- //
import playlists from './routes/playlists';
import search from './routes/search';
import tracks from './routes/tracks';
import auth from './routes/auth';
import me from './routes/me';
import albums from './routes/albums';
// ----------------- routes ----------------- //

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/isrunning', (req, res) => res.send('Server is running!!!'));
app.use('/playlists', playlists);
app.use('/search', search);
app.use('/auth', auth);
app.use('/tracks', tracks);
app.use('/me', me);
app.use('/albums', albums);

export const api = https.onRequest(app);
