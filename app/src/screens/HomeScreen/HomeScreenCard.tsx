import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Track} from '../../recoil/tracks';
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

const HomeScreenCard: React.FC<Track> = props => {
  const {image, preview_url, artist_names, name, spotify_id} = props;
  const {bottom} = useSafeAreaInsets();
  const {navigate} = useNavigation();
  const [playlistAdded, setPlaylistAdded] = useState(false);
  const {height} = useSafeAreaFrame();

  const onPauseResume = useCallback(() => {}, []);

  const onAddToPlaylist = useCallback(async () => {
    setPlaylistAdded(true);
    await axios.post('me/playlist/tracks', {track_id: spotify_id});
  }, [spotify_id]);

  return (
    <View style={[styles.container, {height}]}>
      <Image
        resizeMode="cover"
        style={styles.background}
        source={{uri: image}}
        blurRadius={10}
      />
      <View
        style={[styles.background, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}]}
      />
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
            onPress={() => navigate('Playlist')}
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
});
