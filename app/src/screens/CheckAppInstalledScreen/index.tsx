import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import BaseHeader from '../../components/BaseHeader';
import SpotifyButton from '../../components/SpotifyButton';
import Typography from '../../components/Typography';
import {IS_IOS, SPOTIFY_URL} from '../../constants/values';

const CheckAppInstalledScreen = () => {
  const onInstall = useCallback(() => {
    if (IS_IOS) Linking.openURL(SPOTIFY_URL.appstore);
    else Linking.openURL(SPOTIFY_URL.playstore);
  }, []);

  return (
    <View style={{flex: 1}}>
      <BaseHeader canGoBack={false} title="Spotify app is not installed" />
      <View style={styles.body}>
        <Typography style={styles.content}>
          This service must install spotify application
        </Typography>
        <SpotifyButton onPress={onInstall} title="Install spotify" />
      </View>
    </View>
  );
};

export default CheckAppInstalledScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
  },
  content: {
    marginTop: 24,
    marginBottom: 40,
  },
});
