export interface Track {
  id: string;
  uri: string;
  created_at: Date;
  spotify_id: string;
  name: string;
  artist_names: string[];
  image: string;
  duration_ms: number;
  add_user_id: string;
  climax_file_name: string;
  climax_url: string;
  spotify_data: any;
}
