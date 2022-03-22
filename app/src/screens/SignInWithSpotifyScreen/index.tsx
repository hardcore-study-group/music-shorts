import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {useQuery} from 'react-query';
import axios from '../../config/axios';
import BaseHeader from '../../components/BaseHeader';
import ActivityIndicatorView from '../../components/ActivityIndicatorView';
import WebView from 'react-native-webview';
import {AuthContext} from '../../context/AuthContext';
import useNavigation from '../../hooks/useNavigation';

const SignInWithSpotifyScreen = () => {
  const {signIn} = useContext(AuthContext);
  const {goBack} = useNavigation();

  const {data: url} = useQuery('/me', () =>
    axios
      .get<string>('/auth/oauthurl/spotify?state=app')
      .then(result => result.data),
  );

  const onSignIn = useCallback(
    async (token: {access_token: string; refresh_token: string}) => {
      await signIn(token);
      goBack();
    },
    [],
  );

  return (
    <View style={{flex: 1}}>
      <BaseHeader title="Sign in with spotify" />
      {!url && <ActivityIndicatorView />}
      {url && (
        <WebView
          cacheEnabled
          source={{uri: url}}
          onMessage={event => onSignIn(JSON.parse(event.nativeEvent.data))}
        />
      )}
    </View>
  );
};

export default SignInWithSpotifyScreen;

const styles = StyleSheet.create({});
