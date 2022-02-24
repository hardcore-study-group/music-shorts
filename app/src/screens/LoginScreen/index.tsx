import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SpotifyButton from '../../components/SpotifyButton';
import FastImage from 'react-native-fast-image';
import {AuthContext} from '../../context/AuthContext';

const LoginScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const {authenticate} = useContext(AuthContext);

  return (
    <View style={[styles.container, {paddingVertical: bottom + 80}]}>
      <View style={styles.splashContainer}>
        <FastImage
          style={{width: '40%', height: '40%'}}
          resizeMode="contain"
          source={require('../../assets/splash.png')}
        />
      </View>
      <SpotifyButton onPress={authenticate} title="Sign in with spotify" />
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
