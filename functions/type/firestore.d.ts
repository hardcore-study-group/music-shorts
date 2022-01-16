import {firestore} from 'firebase-admin';

/* eslint-disable camelcase */
export interface Root {
  user: User[];
  track: Track[];
}

export interface User {
  accessToken?: string;
  refreshToken?: string;
  is_admin?: boolean;
  playlist: Playlist;
}
export interface Track {
  createdAt: firestore.Timestamp;
  spotifyId: string;
  name: string;
  artist_names: string[];
  image: string;
  preview_url: string;
  duration_ms: number;
  spotify_data: any;
}
export interface Playlist {
  createdAt: firestore.Timestamp;
  track: Track;
}
