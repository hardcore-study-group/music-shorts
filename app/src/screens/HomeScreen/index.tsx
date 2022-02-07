import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useNavigation from '../../hooks/useNavigation';
import {ApiConfig, ApiScope, auth, remote} from 'react-native-spotify-remote';

const spotifyConfig: ApiConfig = {
  clientID: 'babda1a147134d70b64cb301089cfeaa',
  redirectURL: 'musicshorts://callback',
  scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserReadEmailScope],
};

const HomeScreen = () => {
  const {navigate} = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        console.log((await auth.getSession())?.accessToken);
        // await auth.endSession();
        const session = await auth.authorize(spotifyConfig);
        console.log(session.accessToken);
        await remote.connect(session.accessToken);
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
