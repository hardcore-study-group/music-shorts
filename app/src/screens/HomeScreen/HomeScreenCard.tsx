import {Animated, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {COLORS, STATUSBAR_HEIGHT, WIDTH} from '../../constants/styles';
import FastImage from 'react-native-fast-image';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import BorderlessButton from '../../components/BorderlessButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import useNavigation from '../../hooks/useNavigation';
import Typography from '../../components/Typography';
import artistFormatter from '../../util/artistFormatter';
import axios from '../../config/axios';
import {Track} from '../../constants/types';
import {ShortsPlayerContext} from '../../context/ShortsPlayerContext';
import {AuthContext} from '../../context/AuthContext';

const HomeScreenCard: React.FC<Track> = props => {
  const {image, artist_names, name, spotify_id, preview_url} = props;
  const {pause, resume, paused, uri} = useContext(ShortsPlayerContext);
  const {isAuthorized} = useContext(AuthContext);
  const {bottom} = useSafeAreaInsets();
  const {navigate} = useNavigation();
  const [playlistAdded, setPlaylistAdded] = useState(false);
  const {height} = useSafeAreaFrame();
  const [pauseAnimation] = useState(new Animated.Value(0));

  const isPlaying = preview_url === uri;

  const onPauseResume = useCallback(() => {
    if (paused) resume();
    else pause();
  }, [paused]);

  useEffect(() => {
    if (!isPlaying) return; // only animate focused item
    if (paused)
      Animated.spring(pauseAnimation, {
        toValue: 1,
        useNativeDriver: true,
        speed: 40,
      }).start();
    else pauseAnimation.setValue(0);
  }, [paused]);

  const onAddToPlaylist = useCallback(async () => {
    if (!isAuthorized) return navigate('SignIn');
    setPlaylistAdded(true);
    await axios.post('me/playlist/tracks', {track_id: spotify_id});
  }, [spotify_id, isAuthorized]);

  return (
    <View style={[styles.container, {height}]}>
      <View style={[styles.background, {backgroundColor: '#222'}]} />
      <View style={styles.header}>
        <View style={{height: STATUSBAR_HEIGHT}} />
        <View style={styles.headerButtonContainer}>
          <BorderlessButton
            onPress={() => navigate('Profile')}
            style={styles.headerButton}
          >
            <Icon name="account-outline" size={24} color={COLORS.white} />
          </BorderlessButton>
          <BorderlessButton
            onPress={() =>
              isAuthorized ? navigate('Playlist') : navigate('SignIn')
            }
            style={styles.headerButton}
          >
            <Icon
              name="playlist-music-outline"
              size={24}
              color={COLORS.white}
            />
          </BorderlessButton>
        </View>
      </View>
      <Pressable onPress={onPauseResume}>
        <FastImage source={{uri: image}} style={styles.cover} />
        <View style={styles.pauseContainer}>
          <Animated.View style={{transform: [{scale: pauseAnimation}]}}>
            {paused && (
              <Icon name="pause-circle" size={80} color={COLORS.white} />
            )}
          </Animated.View>
        </View>
      </Pressable>
      <View style={[styles.footer]}>
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Typography numberOfLines={1} style={styles.name}>
              {name}
            </Typography>
            <Typography numberOfLines={1} style={styles.artists}>
              {artistFormatter(artist_names)}
            </Typography>
          </View>
          {!playlistAdded && (
            <BorderlessButton
              style={styles.addToPlaylistButton}
              onPress={onAddToPlaylist}
            >
              <Icon2 name="playlist-add" size={24} color={COLORS.white} />
            </BorderlessButton>
          )}
        </View>
        <View style={{height: bottom}} />
      </View>
    </View>
  );
};

export default HomeScreenCard;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.5,
  },
  cover: {
    width: WIDTH,
    height: WIDTH,
  },
  header: {
    flex: 1,
  },
  headerButtonContainer: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  headerButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    alignItems: 'center',
    marginBottom: 24,
  },
  infoTextContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  name: {
    fontWeight: 'bold',
  },
  artists: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  addToPlaylistButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
});
