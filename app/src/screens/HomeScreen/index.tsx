import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import HomeScreenCard from './HomeScreenCard';
import axios from '../../config/axios';
import {useInfiniteQuery} from 'react-query';
import {Track} from '../../constants/types';
import ActivityindicatorView from '../../components/ActivityIndicatorView';
import {ShortsPlayerContext} from '../../context/ShortsPlayerContext';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = () => {
  const {height} = useSafeAreaFrame();
  const {play, pause, resume} = useContext(ShortsPlayerContext);
  const isFocused = useIsFocused();

  const {data, fetchNextPage} = useInfiniteQuery(
    '/tracks/recommendation',
    () =>
      axios.get<Track[]>('/tracks/recommendation').then(result => result.data),
    {
      getNextPageParam: (lastPage, pages) => pages.length,
    },
  );

  useEffect(() => {
    // only play screen focused
    if (isFocused) resume();
    else pause();
  }, [isFocused]);

  useEffect(() => {
    // first time auto play trigger
    if (!data || data.pages.length !== 1) return;
    play(data.pages[0][0].climax_url);
  }, [data]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      // change playing track when scrolling
      if (!data || !isFocused) return;
      const tracks = data.pages.reduce((prev, crnt) => [...prev, ...crnt], []);
      const index = Math.round(event.nativeEvent.contentOffset.y / height);
      play(tracks[index].climax_url);
    },
    [height, data, isFocused],
  );

  if (!data) return <ActivityindicatorView />;

  return (
    <FlatList
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      pagingEnabled
      onScroll={onScroll}
      keyExtractor={(item, index) => item.id + index}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={2}
      data={data.pages.reduce((prev, crnt) => [...prev, ...crnt], [])}
      renderItem={({item}) => <HomeScreenCard {...item} />}
    />
  );
};

export default HomeScreen;
