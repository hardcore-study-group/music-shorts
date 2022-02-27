import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import BaseHeader from '../../components/BaseHeader';
import useRoute from '../../hooks/useRoute';
import FastImage from 'react-native-fast-image';
import {WIDTH} from '../../constants/styles';
import {auth, remote, RepeatMode} from 'react-native-spotify-remote';
import useNavigation from '../../hooks/useNavigation';
import {spotifyConfig} from '../LoginScreen';

export interface PlayerScreenProps {
  index: number; // -1 meaning shuffle
}

const PlayerScreen = () => {
  const {
    params: {index},
  } = useRoute<'Player'>();
  const {goBack} = useNavigation();

  useEffect(() => {
    (async () => {
      await auth.endSession();
      const session = await auth.authorize(spotifyConfig);
      console.log(session);
      await remote.connect(session.accessToken);
      await remote.setShuffling(index === -1);
      // await remote.setRepeatMode(RepeatMode.Off);
      await remote.playUri('spotify:playlist:10anvRZxbRIG8DSJUW3fqW');
    })();
    return () => {
      remote.pause().then(() => remote.disconnect());
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <BaseHeader title="Player" />
      </View>
      <FastImage style={styles.image} source={{uri: ''}} />
      <View style={{flex: 1}} />
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  image: {width: WIDTH, height: WIDTH},
});
