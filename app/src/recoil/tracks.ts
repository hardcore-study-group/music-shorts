import React from 'react';
import {selector, atom} from 'recoil';
import axios from '../config/axios';

export interface Track {
  id: string;
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

const recommendationTracks = atom<Track[]>({
  key: 'track/recomendation',
  default: [],
});

export const recomendationTracksQuery = selector<Track[]>({
  key: 'query/track/recomendation',
  get: async ({get}) => {
    const tracks = get(recommendationTracks);
    try {
      const {data} = await axios.get('/tracks/recomendation');
      return [...tracks, ...data];
    } catch (error) {
      console.error(error);
      return tracks;
    }
  },
});
