import {firestore} from 'firebase-admin';

export interface Root {
  user: User[];
  track: Track[];
}

export interface User {
  is_admin?: boolean;
  playlist: Playlist;
  called_track_ids: string[];
}
export interface Track {
  created_at: firestore.Timestamp;
  spotify_id: string;
  name: string;
  artist_names: string[];
  image: string;
  preview_url: string;
  duration_ms: number;
  add_user_id: string;
  spotify_data: any;
}
export interface Playlist {
  created_at: firestore.Timestamp;
  track: Track;
}
