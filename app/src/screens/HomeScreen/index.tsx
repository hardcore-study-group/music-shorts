import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useNavigation from '../../hooks/useNavigation';
import {ApiConfig, ApiScope, auth, remote} from 'react-native-spotify-remote';

const spotifyConfig: ApiConfig = {
  clientID: '',
  redirectURL: '',
  scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
};

const HomeScreen = () => {
  const {navigate} = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        // const session = await auth.authorize(spotifyConfig);
        await remote.connect('');
        await remote.playUri('spotify:track:6IA8E2Q5ttcpbuahIejO74');
        await remote.seek(58000);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="playlist" onPress={() => navigate('Playlist')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
