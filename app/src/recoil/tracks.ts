import {atom} from 'recoil';

export interface Track {
  id: string;
  uri: string;
  created_at: Date;
  spotify_id: string;
  name: string;
  artist_names: string[];
  image: string;
  preview_url: string;
  duration_ms: number;
  add_user_id: string;
  spotify_data: any;
}

export const recommendationTracks = atom<Track[]>({
  key: 'track/recomendation',
  default: [],
});
