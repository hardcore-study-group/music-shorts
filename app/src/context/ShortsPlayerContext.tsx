import React, {createContext, useCallback, useMemo, useState} from 'react';
import Video from 'react-native-video';

export type ShortsPlayerContextType = {
  // state
  paused: boolean;
  uri?: string;
  // method
  play: (uri: string) => void;
  pause: () => void;
  resume: () => void;
};

export const ShortsPlayerContext = createContext<ShortsPlayerContextType>(
  {} as any,
);

const ShortsPlayerProvider: React.FC = ({children}) => {
  const [paused, setPaused] = useState(false);
  const [uri, setUri] = useState<string>();

  const play = useCallback((_uri: string) => {
    setUri(_uri);
    setPaused(false);
  }, []);

  const pause = useCallback(() => {
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    setPaused(false);
  }, []);

  const contextValue = useMemo<ShortsPlayerContextType>(
    () => ({
      paused,
      uri,
      play,
      pause,
      resume,
    }),
    [paused, uri, play, pause, resume],
  );

  return (
    <ShortsPlayerContext.Provider value={contextValue}>
      {uri && (
        <Video
          style={{width: 0, height: 0}}
          source={{uri}}
          paused={paused}
          repeat
          audioOnly
        />
      )}
      {children}
    </ShortsPlayerContext.Provider>
  );
};

export default ShortsPlayerProvider;
