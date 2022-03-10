import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BaseHeader from '../../components/BaseHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BorderlessButton from '../../components/BorderlessButton';
import {COLORS} from '../../constants/styles';
import axios from '../../config/axios';
import PlaylistScreenCard from './PlaylistScreenCard';
import useNavigation from '../../hooks/useNavigation';
import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
import ActivityindicatorView from '../../components/ActivityIndicatorView';

const PlaylistScreen = () => {
  const {navigate} = useNavigation();
  const client = useQueryClient();

  const {data, fetchNextPage} = useInfiniteQuery(
    '/me/playlist/tracks',
    ({pageParam = 0}) =>
      axios
        .get<SpotifyApi.PlaylistTrackResponse>('/me/playlist/tracks', {
          params: {offset: pageParam, limit: 20},
        })
        .then(result => result.data.items),
    {
      getNextPageParam: (_, pages) =>
        pages.reduce((prev, crnt) => prev + crnt.length, 0),
      cacheTime: 0,
    },
  );

  const {mutate} = useMutation<unknown, unknown, string>(
    id => axios.delete(`/me/playlist/tracks/${id}`).then(result => result.data),
    {
      onSuccess: (_, id) => {
        if (!data) return;
        data.pages = data.pages.map(tracks =>
          tracks.filter(track => track.track.id !== id),
        );
        client.setQueryData('/me/playlist/tracks', data);
      },
    },
  );

  const onShuffle = useCallback(() => {
    navigate('Player', {index: -1});
  }, []);

  const onPlay = useCallback((index: number) => {
    navigate('Player', {index});
  }, []);

  if (!data) return <ActivityindicatorView />;

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
        data={data.pages.reduce((prev, crnt) => [...prev, ...crnt], [])}
        overScrollMode="never"
        onEndReached={() => fetchNextPage()}
        renderItem={({item, index}) => (
          <PlaylistScreenCard
            index={index}
            item={item}
            onPlay={onPlay}
            onDelete={id => mutate(id)}
          />
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
