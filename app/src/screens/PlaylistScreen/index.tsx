import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BaseHeader from '../../components/BaseHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BorderlessButton from '../../components/BorderlessButton';
import {COLORS} from '../../constants/styles';
import axios from '../../config/axios';
import PlaylistScreenCard from './PlaylistScreenCard';
import useNavigation from '../../hooks/useNavigation';

const PlaylistScreen = () => {
  const {navigate} = useNavigation();
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistTrackObject[]>(
    [],
  );

  useEffect(() => {
    onFetchMore();
  }, []);

  const onFetchMore = useCallback(async () => {
    const {data} = await axios.get<SpotifyApi.PlaylistTrackResponse>(
      '/me/playlist/tracks',
      {
        params: {offset: playlist.length, limit: 20},
      },
    );
    setPlaylist(prev => [...prev, ...data.items]);
  }, [playlist]);

  const onShuffle = useCallback(() => {
    navigate('Player', {});
  }, []);
  const onPlay = useCallback((id: string) => {
    navigate('Player', {id});
  }, []);
  const onDelete = useCallback(async (id: string) => {
    const {status} = await axios.delete(`/me/playlist/tracks/${id}`);
    if (status === 200)
      setPlaylist(prev => prev.filter(v => v.track.id !== id));
  }, []);

  return (
    <View style={{flex: 1}}>
      <BaseHeader
        title="Playlist"
        right={
          <BorderlessButton onPress={onShuffle} style={styles.rightButton}>
            <Icon name="shuffle" size={20} color={COLORS.white} />
          </BorderlessButton>
        }
      />
      <FlatList
        data={playlist}
        overScrollMode="never"
        onEndReached={onFetchMore}
        renderItem={({item}) => (
          <PlaylistScreenCard item={item} onPlay={onPlay} onDelete={onDelete} />
        )}
      />
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  rightButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
