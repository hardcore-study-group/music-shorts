import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ApiConfig, ApiScope, auth} from 'react-native-spotify-remote';
import {BASE_URL, SPOTIFY_CLIENT_ID} from '../constants/values';

const spotifyConfig: ApiConfig = {
  clientID: SPOTIFY_CLIENT_ID,
  redirectURL: 'musicshorts://spotify-login-callback',
  scopes: [ApiScope.AppRemoteControlScope],
  // authType: 'TOKEN',
  tokenSwapURL: `${BASE_URL}/auth/token/swap`,
  tokenRefreshURL: `${BASE_URL}/auth/token/refresh`,
};

export type AuthContextType = {
  accessToken?: string;
  isPremium: boolean;
  authenticate: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as any);

const AuthProvider: React.FC = ({children}) => {
  const [isPremium, setIsPremium] = useState(false);
  const [accessToken, setAccessToken] = useState<string>();
  // get session if logged in last time
  useEffect(() => {
    auth
      .getSession()
      .then(session => session && setAccessToken(session.accessToken));
  }, []);
  // first time login
  const authenticate = useCallback(async () => {
    try {
      const session = await auth.authorize(spotifyConfig);
      console.log(session);
      setAccessToken(session.accessToken);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      accessToken,
      isPremium,
      authenticate,
    }),
    [accessToken, isPremium, authenticate],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
