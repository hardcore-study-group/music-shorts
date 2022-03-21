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
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthContextType = {
  // state
  isAuthorized: boolean;
  isInstalled: boolean;
  isSignedIn: boolean;
  isPremium?: boolean;
  // method
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  checkPremium: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as any);

const AuthProvider: React.FC = ({children}) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const {data: isPremium, refetch} = useQuery(
    '/me',
    () =>
      axios
        .get<SpotifyApi.CurrentUsersProfileResponse>('/me')
        .then(result => result.data.product === 'premium')
        .catch(() => false),
    {refetchInterval: 30 * 60 * 1000},
  );

  const isAuthorized = useMemo(
    () => isInstalled && isSignedIn && !!isPremium,
    [isInstalled, isSignedIn, isPremium],
  );

  useEffect(() => {
    // check spotify app installed every second
    const AppInstalledInterval = setInterval(
      () =>
        Linking.canOpenURL('spotify://').then(canOpen =>
          setIsInstalled(canOpen),
        ),
      1000,
    );
    // refresh token every 30min
    const refreshTokenInterval = setInterval(refreshToken, 30 * 60 * 1000);
    // claer interval when app exit
    return () => {
      clearInterval(AppInstalledInterval);
      clearInterval(refreshTokenInterval);
    };
  }, []);

  const refreshToken = useCallback(async () => {
    const refresh_token = await AsyncStorage.getItem('refresh_token');
    // signed out
    if (!refreshToken) return await signOut();
    // pre signed in
    const {data} = await axios.post('auth/token/refresh', {refresh_token});
    axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
    setIsSignedIn(true);
  }, []);

  const signIn = useCallback(async () => {
    try {
      const {accessToken, refreshToken: refresh_token} = await auth.authorize(
        SPOTIFY_CONFIG,
      );
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      await AsyncStorage.setItem('refresh_token', refresh_token);
      setIsSignedIn(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    await auth.endSession();
    await AsyncStorage.removeItem('refresh_token');
    await refetch();
    axios.defaults.headers.common.Authorization = '';
    setIsSignedIn(false);
  }, []);

  const checkPremium = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isAuthorized,
      isInstalled,
      isSignedIn,
      isPremium,
      signIn,
      signOut,
      checkPremium,
    }),
    [
      isAuthorized,
      isInstalled,
      isSignedIn,
      isPremium,
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
