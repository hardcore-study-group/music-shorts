import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useRecoilValue, useRecoilCallback} from 'recoil';
import HomeScreenCard from './HomeScreenCard';
import {recommendationTracks} from '../../recoil/tracks';
import axios from '../../config/axios';

const HomeScreen = () => {
  const tracks = useRecoilValue(recommendationTracks);

  const fetchMoreRecommendationTracks = useRecoilCallback(
    ({set}) =>
      async () => {
        const {data} = await axios.get('/tracks/recomendation');
        set(recommendationTracks, current => [...current, ...data]);
      },
    [],
  );

  useEffect(() => {
    fetchMoreRecommendationTracks();
  }, []);

  return (
    <FlatList
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      pagingEnabled
      onEndReached={() => fetchMoreRecommendationTracks()}
      onEndReachedThreshold={2}
      data={tracks}
      renderItem={({item}) => <HomeScreenCard {...item} />}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
