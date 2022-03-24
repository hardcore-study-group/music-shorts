export interface Track {
  id: string;
  created_at: Date;
  name: string;
  artist_names: string[];
  image: string;
  // add_user_id: string;
  climax_file_name: string;
  climax_url: string;
  apple_id: string;
  spotify_id: string;
  youtube_id: string;
  spotify_data: any;
  apple_data: any;
}

export type Type = 'spotify' | 'youtube';
