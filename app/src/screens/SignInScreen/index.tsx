import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import BaseHeader from '../../components/BaseHeader';
import useNavigation from '../../hooks/useNavigation';
import Typography from '../../components/Typography';
import {AuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/styles';
import BaseButton from '../../components/BaseButton';

const SignInScreen = () => {
  const {goBack} = useNavigation();
  const {signInWithSpotify, signInWithYoutube, isAuthorized} =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthorized) goBack();
  }, [isAuthorized]);

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
        <BaseButton
          onPress={signInWithSpotify}
          style={[styles.signInButton, {backgroundColor: COLORS.spotify}]}
        >
          <Icon name="spotify" size={24} color={COLORS.white} />
          <Typography style={styles.signInButtonTitle}>
            Sign in with spotify
          </Typography>
        </BaseButton>
        {/* <BaseButton
          onPress={signInWithYoutube}
          style={[
            styles.signInButton,
            {backgroundColor: COLORS.youtube, marginTop: 24},
          ]}
        >
          <Icon name="youtube" size={24} color={COLORS.white} />
          <Typography style={styles.signInButtonTitle}>
            Sign in with youtube music
          </Typography>
        </BaseButton> */}
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
  signInButton: {
    width: '100%',
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonTitle: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
