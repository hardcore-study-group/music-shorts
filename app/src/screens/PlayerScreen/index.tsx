import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import BaseHeader from '../../components/BaseHeader';
import useRoute from '../../hooks/useRoute';
import FastImage from 'react-native-fast-image';
import {WIDTH} from '../../constants/styles';
import {auth, remote, RepeatMode} from 'react-native-spotify-remote';
import useNavigation from '../../hooks/useNavigation';
import {SPOTIFY_CONFIG} from '../../constants/values';
import axios from '../../config/axios';

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
      try {
        // get playlist_id from my server
        const {data} = await axios.get('/me');
        const playlist_id = data.playlist_id;
        // connect to spotify app
        const isConnected = await remote.isConnectedAsync();
        if (!isConnected) {
          await auth.endSession(); // clear session
          const session = await auth.authorize({
            ...SPOTIFY_CONFIG,
            playURI: `spotify:playlist:${playlist_id}`, // if no playURI at authorize, you can't play music
          });
          await remote.connect(session.accessToken); // connect
        } else {
          await remote.playUri(`spotify:playlist:${playlist_id}`); // when connected just setup to current playlist
        }
        // default option
        await remote.setRepeatMode(RepeatMode.Context);
        // options by index param
        if (index !== -1) {
          // when click playlist item
          await remote.setShuffling(false);
          const contentItem = await remote.getContentItemForUri(
            `spotify:playlist:${playlist_id}`,
          );
          if (!contentItem) throw Error('no content item'); // android TODO
          await remote.playItemWithIndex(contentItem, index); // play current playlist and seak to clicked item index
        } else {
          // when click shuffle
          await remote.setShuffling(true);
          await remote.skipToNext();
        }
      } catch (error) {
        console.log(error);
        goBack();
      }
    })();
    return () => {
      remote.pause();
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
