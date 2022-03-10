import {FlatList, StyleSheet, Text} from 'react-native';
import React from 'react';
import HomeScreenCard from './HomeScreenCard';
import axios from '../../config/axios';
import {useInfiniteQuery} from 'react-query';
import {Track} from '../../constants/types';
import ActivityindicatorView from '../../components/ActivityIndicatorView';

const HomeScreen = () => {
  const {data, fetchNextPage} = useInfiniteQuery(
    '/tracks/recommendation',
    () =>
      axios.get<Track[]>('/tracks/recommendation').then(result => result.data),
    {
      getNextPageParam: (lastPage, pages) => pages.length,
    },
  );
  if (!data) return <ActivityindicatorView />;

  return (
    <FlatList
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      pagingEnabled
      keyExtractor={(item, index) => item.id + index}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={2}
      data={data.pages.reduce((tracks, crnt) => [...crnt, ...tracks], [])}
      renderItem={({item}) => <HomeScreenCard {...item} />}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
