import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SPOTIFY_AUTH_CONFIG, YOUTUBE_AUTH_CONFIG} from '../constants/values';
import {authorize, refresh} from 'react-native-app-auth';
import {Type} from '../constants/types';

export type AuthContextType = {
  // state
  isAuthorized: boolean;
  type?: Type;
  // method
  signInWithSpotify: () => Promise<void>;
  signInWithYoutube: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as any);

const AuthProvider: React.FC = ({children}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [type, setType] = useState<Type>();

  useEffect(() => {
    // login with cached refresh_token
    refreshToken().catch(() => null /* no refresh token */);
    // refresh token every 30min
    const refreshTokenInterval = setInterval(refreshToken, 30 * 60 * 1000);
    // claer interval when app exit
    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, []);

  const refreshToken = useCallback(async () => {
    const refresh_token = await AsyncStorage.getItem('refresh_token');
    const _type = (await AsyncStorage.getItem('type')) as Type | null;
    // signed out
    if (!refresh_token || !_type) return await signOut();
    // pre signed in
    let access_token = '';
    switch (_type) {
      case 'spotify': {
        const {data} = await axios.post('auth/token/refresh', {refresh_token});
        access_token = data.access_token;
        break;
      }
      case 'youtube': {
        const {accessToken} = await refresh(YOUTUBE_AUTH_CONFIG, {
          refreshToken: refresh_token,
        });
        access_token = accessToken;
        break;
      }
      default:
        return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    setIsAuthorized(true);
  }, []);

  const signInWithSpotify = useCallback(async () => {
    try {
      // only use react-native-app-auth when first sign in
      const token = await authorize(SPOTIFY_AUTH_CONFIG);
      axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
      await AsyncStorage.setItem('refresh_token', token.refreshToken);
      await AsyncStorage.setItem('type', 'spotify');
      setType('spotify');
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signInWithYoutube = useCallback(async () => {
    try {
      // only use react-native-app-auth when first sign in
      const token = await authorize(YOUTUBE_AUTH_CONFIG);
      axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
      await AsyncStorage.setItem('refresh_token', token.refreshToken);
      await AsyncStorage.setItem('type', 'youtube');
      setType('youtube');
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('type');
    axios.defaults.headers.common.Authorization = '';
    setType(undefined);
    setIsAuthorized(false);
  }, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isAuthorized,
      signInWithSpotify,
      signInWithYoutube,
      signOut,
      type,
    }),
    [isAuthorized, signInWithSpotify, signInWithYoutube, signOut, type],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
