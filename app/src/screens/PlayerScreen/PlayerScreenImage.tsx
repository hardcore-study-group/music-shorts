import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {PlayerContext} from '../../context/PlayerContext';
import FastImage from 'react-native-fast-image';
import {WIDTH} from '../../constants/styles';
import axios from '../../config/axios';

const PlayerScreenImage = () => {
  const {playerState} = useContext(PlayerContext);
  const [imageUri, setImageUri] = useState<string>();

  useEffect(() => {
    if (!playerState) return;
    (async () => {
      const {data} = await axios.get<SpotifyApi.SingleAlbumResponse>(
        `/albums/${playerState?.track.album.uri.split(':')[2]}`,
      );
      setImageUri(data.images[0].url);
    })();
  }, [playerState?.track.album.uri]);

  return <FastImage style={styles.image} source={{uri: imageUri}} />;
};

export default PlayerScreenImage;

const styles = StyleSheet.create({
  image: {width: WIDTH, height: WIDTH},
});
