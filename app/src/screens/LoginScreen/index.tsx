import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SpotifyButton from '../../components/SpotifyButton';
import FastImage from 'react-native-fast-image';
import {useRecoilRefresher_UNSTABLE} from 'recoil';
import {auth} from 'react-native-spotify-remote';
import {SPOTIFY_CONFIG} from '../../constants/values';
import {accessTokenQuery} from '../../recoil/auth';

const LoginScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const refresh = useRecoilRefresher_UNSTABLE(accessTokenQuery);

  const signin = useCallback(async () => {
    try {
      await auth.authorize(SPOTIFY_CONFIG);
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
