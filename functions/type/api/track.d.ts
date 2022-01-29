export interface GetTracksData {
  offset: number;
  limit: number;
}
export interface RemoveTrackData {
  id: string;
}

export interface AddTrackData {
  spotifyTrackId: string;
}

export interface GetRecommendTracks {
  anonymouseId?: string;
}
