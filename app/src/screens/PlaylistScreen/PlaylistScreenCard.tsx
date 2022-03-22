import {Animated, Linking, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef} from 'react';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/styles';
import Typography from '../../components/Typography';
import artistFormatter from '../../util/artistFormatter';
import durationFormatter from '../../util/durationFormatter';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PlaylistScreenCardProps {
  item: SpotifyApi.PlaylistTrackObject;
  onDelete: (id: string) => void;
}

const PlaylistScreenCard: React.FC<PlaylistScreenCardProps> = props => {
  const swipeableRef = useRef<Swipeable>(null);
  const {
    item: {
      track: {
        id,
        album: {images},
        artists,
        duration_ms,
        name,
      },
    },
    onDelete,
  } = props;

  const onPress = useCallback(() => {
    Linking.openURL(`https://open.spotify.com/track/${id}`);
  }, [id]);

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
        <FastImage source={{uri: images[0].url}} style={styles.image} />
        <View>
          <Typography numberOfLines={1} style={styles.name}>
            {name}
          </Typography>
          <Typography numberOfLines={1} style={styles.info}>
            {`${artistFormatter(
              artists.map(v => v.name),
            )} ・ ${durationFormatter(duration_ms)}`}
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
