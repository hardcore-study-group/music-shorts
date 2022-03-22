import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from '../config/axios';
import {SPOTIFY_CONFIG} from '../constants/values';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthContextType = {
  // state
  isAuthorized: boolean;
  // method
  signIn: (token: {
    access_token: string;
    refresh_token: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as any);

const AuthProvider: React.FC = ({children}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // refresh token every 30min
    const refreshTokenInterval = setInterval(refreshToken, 30 * 60 * 1000);
    // claer interval when app exit
    return () => {
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
    setIsAuthorized(true);
  }, []);

  const signIn = useCallback(
    async ({
      access_token,
      refresh_token,
    }: {
      access_token: string;
      refresh_token: string;
    }) => {
      try {
        axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        await AsyncStorage.setItem('refresh_token', refresh_token);
        setIsAuthorized(true);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('refresh_token');
    axios.defaults.headers.common.Authorization = '';
    setIsAuthorized(false);
  }, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isAuthorized,
      signIn,
      signOut,
    }),
    [isAuthorized, signIn, signOut],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
