import express from 'express';
import {https} from 'firebase-functions';
// ----------------- routes ----------------- //
import playlists from './routes/playlists';
import search from './routes/search';
import tracks from './routes/tracks';
import auth from './routes/auth';
// ----------------- routes ----------------- //

const app = express();

app.get('/isrunning', (req, res) => res.send('Server is running!!!'));
app.use('/playlists', playlists);
app.use('/search', search);
app.use('/auth', auth);
app.use('/tracks', tracks);

export const api = https.onRequest(app);
