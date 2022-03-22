import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BaseHeader from '../../components/BaseHeader';
import SpotifyButton from '../../components/SpotifyButton';
import useNavigation from '../../hooks/useNavigation';
import Typography from '../../components/Typography';

const SignInScreen = () => {
  const {replace} = useNavigation();

  return (
    <View style={{flex: 1}}>
      <BaseHeader title="Sign in" />
      <View style={styles.body}>
        <Typography>Features that can be used by signing in</Typography>
        <Typography style={[styles.feature, {marginTop: 24}]}>
          - You can save of your favorite songs
        </Typography>
        <Typography style={[styles.feature, {marginTop: 8, marginBottom: 56}]}>
          - The saved songs are synchronized with the Spotify playlist
        </Typography>
        <SpotifyButton
          title="Sign in with spotify"
          onPress={() => replace('SignInWithSpotify')}
        />
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  feature: {
    fontSize: 12,
  },
});
