import {
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useContext} from 'react';
import BaseHeader from '../../components/BaseHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BorderlessButton from '../../components/BorderlessButton';
import {COLORS} from '../../constants/styles';
import axios from '../../config/axios';
import PlaylistScreenCard from './PlaylistScreenCard';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import ActivityindicatorView from '../../components/ActivityIndicatorView';
import {PlaylistContext} from '../../context/PlaylistContext';
import {usePersistedState} from 'react-native-use-persisted-state';
import FastImage from 'react-native-fast-image';

const PlaylistScreen = () => {
  const {playlist, remove} = useContext(PlaylistContext);
  const [playerType, setPlayerType] = usePersistedState<
    'spotify' | 'youtube' | 'youtube-music'
  >('@type', 'spotify');

  // const client = useQueryClient();

  // const {data: me} = useQuery('/me', () =>
  //   axios.get('/me').then(({data}) => data),
  // );

  // const {data, fetchNextPage} = useInfiniteQuery(
  //   '/me/playlist/tracks',
  //   ({pageParam = 0}) =>
  //     axios
  //       .get<SpotifyApi.PlaylistTrackResponse>('/me/playlist/tracks', {
  //         params: {offset: pageParam, limit: 20},
  //       })
  //       .then(result => result.data.items),
  //   {
  //     getNextPageParam: (_, pages) =>
  //       pages.reduce((prev, crnt) => prev + crnt.length, 0),
  //     cacheTime: 0,
  //   },
  // );

  // const {mutate} = useMutation<unknown, unknown, string>(
  //   id => axios.delete(`/me/playlist/tracks/${id}`).then(result => result.data),
  //   {
  //     onSuccess: (_, id) => {
  //       if (!data) return;
  //       data.pages = data.pages.map(tracks =>
  //         tracks.filter(track => track.track.id !== id),
  //       );
  //       client.setQueryData('/me/playlist/tracks', data);
  //     },
  //   },
  // );

  // const onRightButtonPress = useCallback(() => {
  //   if (!me) return;
  //   Linking.openURL(`https://open.spotify.com/playlist/${me.playlist_id}`);
  // }, [me]);

  // if (!data) return <ActivityindicatorView />;

  return (
    <View style={{flex: 1}}>
      <BaseHeader
        title="Playlist"
        right={
          <BorderlessButton
            onPress={() => {
              if (playerType === 'spotify')
                return setPlayerType('youtube-music');
              if (playerType === 'youtube-music')
                return setPlayerType('youtube');
              if (playerType === 'youtube') return setPlayerType('spotify');
            }}
            style={styles.rightButton}
          >
            {playerType === 'spotify' && (
              <Icon name="spotify" size={20} color={COLORS.spotify} />
            )}
            {playerType === 'youtube' && (
              <Icon name="youtube" size={20} color={COLORS.youtube} />
            )}
            {playerType === 'youtube-music' && (
              <FastImage
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTubeMusic_Logo.png',
                }}
                style={{width: 24, height: 24}}
              />
            )}
          </BorderlessButton>
        }
      />
      <FlatList
        // data={data.pages.reduce((prev, crnt) => [...prev, ...crnt], [])}
        // onEndReached={() => fetchNextPage()}
        // showsVerticalScrollIndicator={false}
        overScrollMode="never"
        data={playlist}
        ListFooterComponent={<View style={{height: 80}} />}
        renderItem={({item}) => (
          <PlaylistScreenCard
            item={item}
            playerType={playerType}
            // onDelete={id => mutate(id)}
            onDelete={remove}
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
