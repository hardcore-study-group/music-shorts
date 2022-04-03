import React, {createContext, useCallback, useMemo} from 'react';
import {usePersistedState} from 'react-native-use-persisted-state';
import {Track} from '../constants/types';

export type PlaylistContextType = {
  // state
  playlist: Track[];
  // method
  add: (track: Track) => void;
  remove: (id: string) => void;
};

export const PlaylistContext = createContext<PlaylistContextType>({} as any);

const PlaylistProvider: React.FC = ({children}) => {
  const [playlist, setPlaylist] = usePersistedState<Track[]>('@playlist', []);

  const add = useCallback(
    (track: Track) => setPlaylist([track, ...playlist]),
    [playlist],
  );

  const remove = useCallback(
    (id: string) => setPlaylist(playlist.filter(v => v.id !== id)),
    [playlist],
  );

  const contextValue = useMemo<PlaylistContextType>(
    () => ({
      playlist,
      add,
      remove,
    }),
    [add, remove],
  );

  return (
    <PlaylistContext.Provider value={contextValue}>
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
