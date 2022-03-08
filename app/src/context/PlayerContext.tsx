import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  auth,
  ContentItem,
  PlayerState,
  remote,
  RepeatMode,
} from 'react-native-spotify-remote';
import axios from '../config/axios';
import {IS_IOS, SPOTIFY_CONFIG} from '../constants/values';

export type PlayerContextType = {
  // state
  playerState?: PlayerState;
  // method
  play: (index: number) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  seek: (ms: number) => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
};

export const PlayerContext = createContext<PlayerContextType>({} as any);

const PlayerProvider: React.FC = ({children}) => {
  const [playerState, setPlayerState] = useState<PlayerState>();

  useEffect(() => {
    // listner
    remote.on('playerStateChanged', state => setPlayerState(state));
    // It's trick. remote api doesn't fetch autometicly even though added the listner
    const interval = setInterval(
      () => remote.getPlayerState().catch(() => {}),
      1000,
    );
    // unmount
    return () => {
      remote.removeAllListeners();
      clearInterval(interval);
    };
  }, []);

  const play = useCallback(async (index: number /*1 meaning shuffle */) => {
    // get playlist_id from my server
    const {data} = await axios.get('/me');
    const playlist_id = data.playlist_id;
    // connect to spotify app
    const isConnected = await remote.isConnectedAsync();
    if (!isConnected) {
      await auth.endSession(); // clear session
      const session = await auth.authorize({
        ...SPOTIFY_CONFIG,
        playURI: `spotify:playlist:${playlist_id}`, // if no playURI at authorize, you can't play music
      });
      await remote.connect(session.accessToken); // connect
    } else {
      await remote.playUri(`spotify:playlist:${playlist_id}`); // when connected just setup to current playlist
    }
    await remote.pause();
    // default option
    await remote.setRepeatMode(RepeatMode.Context);
    // options by index param
    if (index !== -1) {
      // when click playlist item
      await remote.setShuffling(false);
      const contentItem: ContentItem | undefined = IS_IOS
        ? await remote.getContentItemForUri(`spotify:playlist:${playlist_id}`)
        : {
            availableOffline: false,
            children: [],
            container: false,
            id: `spotify:playlist:${playlist_id}`,
            playable: true,
            subtitle: 'Made by Music shorts',
            title: 'Music shorts',
            uri: `spotify:playlist:${playlist_id}`,
          };

      if (!contentItem) throw Error('no content item'); // android TODO
      await remote.playItemWithIndex(contentItem, index); // play current playlist and seak to clicked item index
    } else {
      // when click shuffle
      await remote.setShuffling(true);
      await remote.skipToNext();
    }
    await remote.resume();
  }, []);

  const pause = useCallback(async () => {
    await remote.pause();
  }, []);

  const resume = useCallback(async () => {
    await remote.resume();
  }, []);

  const seek = useCallback(async (ms: number) => {
    await remote.seek(ms);
  }, []);

  const prev = useCallback(async () => {
    await remote.skipToPrevious();
  }, []);

  const next = useCallback(async () => {
    await remote.skipToNext();
  }, []);

  const contextValue = useMemo<PlayerContextType>(
    () => ({
      playerState,
      play,
      pause,
      resume,
      seek,
      prev,
      next,
    }),
    [playerState, play, pause, resume, seek, prev, next],
  );

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
