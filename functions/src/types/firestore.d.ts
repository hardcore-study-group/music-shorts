import {firestore} from 'firebase-admin';

export type Type = 'spotify' | 'youtube';

export interface Root {
  user: User[];
  track: Track[];
  device: Device[];
}

export interface User {
  playlist_id: string;
  type: Type;
}
export interface Track {
  created_at: firestore.Timestamp;
  name: string;
  artist_names: string[];
  image: string;
  // add_user_id: string;
  climax_file_name: string;
  spotify_id: string;
  youtube_id: string;
  spotify_data: any;
  youtube_data: any;
}
export interface Device {
  called_track_ids: string[];
}
