import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useRecoilValue, useRecoilRefresher_UNSTABLE} from 'recoil';
import {recomendationTracksQuery} from '../../recoil/tracks';
import HomeScreenCard from './HomeScreenCard';
import {auth} from 'react-native-spotify-remote';

const HomeScreen = () => {
  const tracks = useRecoilValue(recomendationTracksQuery);
  const fetchMore = useRecoilRefresher_UNSTABLE(recomendationTracksQuery);

  return (
    <FlatList
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      pagingEnabled
      onEndReached={fetchMore}
      data={tracks}
      renderItem={({item}) => <HomeScreenCard {...item} />}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
