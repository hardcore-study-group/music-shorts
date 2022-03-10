import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from '../config/axios';
import {useQuery} from 'react-query';
import {auth} from 'react-native-spotify-remote';
import {Linking} from 'react-native';
import {SPOTIFY_CONFIG} from '../constants/values';

export type AuthContextType = {
  // state
  isInstalled: boolean;
  accessToken?: string;
  isPremium?: boolean;
  // method
  initializeAccessToken: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  checkPremium: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as any);

const AuthProvider: React.FC = ({children}) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [accessToken, setAccessToken] = useState<string>();
  const {data: isPremium, refetch} = useQuery('/me', () =>
    axios
      .get<SpotifyApi.CurrentUsersProfileResponse>('/me')
      .then(result => result.data.product === 'premium'),
  );

  useEffect(() => {
    // initialize accessToken
    initializeAccessToken();
    // check spotify app installed every second
    const interval = setInterval(
      () =>
        Linking.canOpenURL('spotify://').then(canOpen =>
          setIsInstalled(canOpen),
        ),
      1000,
    );
    // claer interval when app exit
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // refetch premium
    checkPremium();
    // replace axios header with new accessToken
    axios.defaults.headers.common.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : '';
  }, [accessToken]);

  const initializeAccessToken = useCallback(async () => {
    const session = await auth.getSession();
    setAccessToken(session?.accessToken);
  }, []);

  const signIn = useCallback(async () => {
    try {
      await auth.authorize(SPOTIFY_CONFIG);
      initializeAccessToken();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    await auth.endSession();
    initializeAccessToken();
  }, []);

  const checkPremium = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isInstalled,
      accessToken,
      isPremium,
      initializeAccessToken,
      signIn,
      signOut,
      checkPremium,
    }),
    [
      isInstalled,
      accessToken,
      isPremium,
      initializeAccessToken,
      signIn,
      signOut,
      checkPremium,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
