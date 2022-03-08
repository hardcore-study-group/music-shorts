import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import BaseHeader from '../../components/BaseHeader';
import useRoute from '../../hooks/useRoute';
import {PlayerContext} from '../../context/PlayerContext';
import PlayerScreenImage from './PlayerScreenImage';
import Typography from '../../components/Typography';
import {COLORS} from '../../constants/styles';
import PlayerScreenController from './PlayerScreenController';
import PlayerScreenSlider from './PlayerScreenSlider';

export interface PlayerScreenProps {
  index: number; // -1 meaning shuffle
}

const PlayerScreen = () => {
  const {
    params: {index},
  } = useRoute<'Player'>();
  const {pause, play, playerState} = useContext(PlayerContext);

  useEffect(() => {
    play(index);
    return () => {
      pause();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <BaseHeader title="Player" />
        <View style={styles.titleContainer}>
          <Typography style={styles.trackName}>
            {playerState?.track.name}
          </Typography>
          <Typography style={styles.artistName}>
            {playerState?.track.artist.name}
          </Typography>
        </View>
      </View>
      <PlayerScreenImage />
      <View style={{flex: 1}}>
        <PlayerScreenSlider />
        <PlayerScreenController />
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackName: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artistName: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 16,
  },
});
