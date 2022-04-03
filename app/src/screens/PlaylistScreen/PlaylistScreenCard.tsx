import {Animated, Linking, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef} from 'react';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/styles';
import Typography from '../../components/Typography';
import artistFormatter from '../../util/artistFormatter';
import durationFormatter from '../../util/durationFormatter';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Track} from '../../constants/types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PlaylistScreenCardProps {
  // item: SpotifyApi.PlaylistTrackObject;
  item: Track;
  onDelete: (id: string) => void;
  playerType: string;
}

const PlaylistScreenCard: React.FC<PlaylistScreenCardProps> = props => {
  const swipeableRef = useRef<Swipeable>(null);
  const {
    // item: {
    //   track: {
    //     id,
    //     album: {images},
    //     artists,
    //     duration_ms,
    //     name,
    //   },
    // },
    item: {id, spotify_id, youtube_id, image, artist_names, name},
    playerType,
    onDelete,
  } = props;

  const onPress = useCallback(() => {
    if (playerType === 'spotify')
      Linking.openURL(`https://open.spotify.com/track/${spotify_id}`);
    if (playerType === 'youtube')
      Linking.openURL(`https://youtube.com/watch?v=${youtube_id}`);
    if (playerType === 'youtube-music')
      Linking.openURL(`https://music.youtube.com/watch?v=${youtube_id}`);
  }, [spotify_id, youtube_id, playerType]);

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={(progress, dragX) => {
        const translateX = dragX.interpolate({
          inputRange: [-65, -64, 0, 1],
          outputRange: [0, 0, 64, 64],
        });

        return (
          <AnimatedPressable
            style={[styles.deleteButtonContainer, {transform: [{translateX}]}]}
            onPress={() => {
              swipeableRef.current?.close();
              onDelete(id);
            }}
          >
            <Icon name="delete-outline" size={24} color={COLORS.white} />
          </AnimatedPressable>
        );
      }}
    >
      <Pressable onPress={onPress} style={styles.container}>
        <FastImage
          //  source={{uri: images[0].url}}
          source={{uri: image}}
          style={styles.image}
        />
        <View>
          <Typography numberOfLines={1} style={styles.name}>
            {name}
          </Typography>
          <Typography numberOfLines={1} style={styles.info}>
            {artistFormatter(artist_names)}
            {/* {`${artistFormatter(
              artists.map(v => v.name),
            )} ・ ${durationFormatter(duration_ms)}`} */}
          </Typography>
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default PlaylistScreenCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 16,
  },
  name: {},
  info: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4,
  },
  deleteButtonContainer: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
