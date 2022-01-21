import {firestore} from 'firebase-admin';

/* eslint-disable camelcase */
export interface Root {
  user: User[];
  track: Track[];
}

export interface User {
  access_token?: string;
  refresh_token?: string;
  is_admin?: boolean;
  playlist: Playlist;
}
export interface Track {
  created_at: firestore.Timestamp;
  spotify_id: string;
  name: string;
  artist_names: string[];
  image: string;
  preview_url: string;
  duration_ms: number;
  spotify_data: any;
}
export interface Playlist {
  created_at: firestore.Timestamp;
  track: Track;
}