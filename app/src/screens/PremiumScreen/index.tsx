import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import BaseHeader from '../../components/BaseHeader';
import SpotifyButton from '../../components/SpotifyButton';
import Typography from '../../components/Typography';
import {SPOTIFY_PREMIUM_URL} from '../../constants/values';
import {COLORS} from '../../constants/styles';
import {auth} from 'react-native-spotify-remote';
import {AuthContext} from '../../context/AuthContext';

const PremiumScreen = () => {
  const {signOut, checkPremium} = useContext(AuthContext);

  const onUpgradeToPremium = useCallback(() => {
    Linking.openURL(SPOTIFY_PREMIUM_URL);
  }, []);

  return (
    <View style={{flex: 1}}>
      <BaseHeader canGoBack={false} title="Premium require" />
      <View style={styles.body}>
        <Typography style={styles.content}>
          This service need a premium spotify account.
        </Typography>
        <SpotifyButton
          onPress={onUpgradeToPremium}
          title="Upgrade to premium"
        />
        <View style={styles.options}>
          <Pressable onPress={checkPremium}>
            <Typography style={styles.option}>recheck</Typography>
          </Pressable>
          <View style={styles.divider} />
          <Pressable onPress={signOut}>
            <Typography style={styles.option}>sign out</Typography>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PremiumScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
  },
  content: {
    marginTop: 24,
    marginBottom: 40,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    alignSelf: 'center',
  },
  divider: {
    width: 1,
    height: 10,
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
  },
  option: {
    fontSize: 12,
  },
});
