import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {PlayerContext} from '../../context/PlayerContext';
import Typography from '../../components/Typography';
import durationFormatter from '../../util/durationFormatter';
import Slider from '@react-native-community/slider';

const PlayerScreenSlider = () => {
  const {playerState, seek} = useContext(PlayerContext);

  return (
    <View style={styles.container}>
      <Slider
        style={{width: '100%', height: 16}}
        value={playerState?.playbackPosition || 0}
        minimumValue={0}
        maximumValue={playerState?.track.duration || 0}
        onSlidingComplete={seek}
        thumbTintColor="#fff"
        minimumTrackTintColor="#555"
        maximumTrackTintColor="#333"
      />
      <View style={styles.timeContainer}>
        <Typography style={styles.time}>
          {durationFormatter(playerState?.playbackPosition || 0)}
        </Typography>
        <Typography style={styles.time}>
          {durationFormatter(playerState?.track.duration || 0)}
        </Typography>
      </View>
    </View>
  );
};

export default PlayerScreenSlider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  time: {
    fontSize: 12,
  },
});
