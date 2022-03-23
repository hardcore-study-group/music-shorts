import {firestore} from 'firebase-admin';

export interface Root {
  user: User[];
  track: Track[];
  device: Device[];
}

export interface User {
  is_admin?: boolean;
  playlist_id: string;
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
