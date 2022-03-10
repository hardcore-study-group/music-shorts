import {FlatList, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import HomeScreenCard from './HomeScreenCard';
import axios from '../../config/axios';
import {} from 'react-query';

const HomeScreen = () => {
  // const {} = useQuery();
  // const tracks = useRecoilValue(recommendationTracks);

  // const fetchMoreRecommendationTracks = useRecoilCallback(
  //   ({set}) =>
  //     async () => {
  //       const {data} = await axios.get('/tracks/recommendation');
  //       set(recommendationTracks, current => [...current, ...data]);
  //     },
  //   [],
  // );

  // useEffect(() => {
  //   fetchMoreRecommendationTracks();
  // }, []);

  return (
    <FlatList
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      pagingEnabled
      keyExtractor={(item, index) => item.id + index}
      onEndReached={() => fetchMoreRecommendationTracks()}
      onEndReachedThreshold={2}
      data={tracks}
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
