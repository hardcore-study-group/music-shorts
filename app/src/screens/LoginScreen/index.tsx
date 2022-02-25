import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SpotifyButton from '../../components/SpotifyButton';
import FastImage from 'react-native-fast-image';
import {useRecoilRefresher_UNSTABLE} from 'recoil';
import {ApiConfig, ApiScope, auth} from 'react-native-spotify-remote';
import {BASE_URL, SPOTIFY_CLIENT_ID} from '../../constants/values';
import {accessTokenQuery} from '../../recoil/auth';

const spotifyConfig: ApiConfig = {
  clientID: SPOTIFY_CLIENT_ID,
  redirectURL: 'musicshorts://spotify-login-callback',
  scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserReadPrivateScope,
    ApiScope.PlaylistModifyPrivateScope,
    ApiScope.PlaylistReadPrivateScope,
    ApiScope.PlaylistReadCollaborativeScope,
    ApiScope.UGCImageUploadScope,
  ],
  tokenSwapURL: `${BASE_URL}/auth/token/swap`,
  tokenRefreshURL: `${BASE_URL}/auth/token/refresh`,
};

const LoginScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const refresh = useRecoilRefresher_UNSTABLE(accessTokenQuery);

  const signin = useCallback(async () => {
    try {
      await auth.authorize(spotifyConfig);
      refresh();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={[styles.container, {paddingVertical: bottom + 80}]}>
      <View style={styles.splashContainer}>
        <FastImage
          style={{width: '40%', height: '40%'}}
          resizeMode="contain"
          source={require('../../assets/splash.png')}
        />
      </View>
      <SpotifyButton onPress={signin} title="Sign in with spotify" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
