import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ApiConfig, ApiScope, auth} from 'react-native-spotify-remote';
import {BASE_URL} from '../constants/values';

const spotifyConfig: ApiConfig = {
  clientID: 'babda1a147134d70b64cb301089cfeaa',
  redirectURL: 'musicshorts://spotify-login-callback',
  scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
  authType: 'TOKEN',
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
    const session = await auth.authorize(spotifyConfig);
    setAccessToken(session.accessToken);
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
