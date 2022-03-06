import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/styles';
import BorderlessButton from '../../components/BorderlessButton';
import {PlayerContext} from '../../context/PlayerContext';

const PlayerScreenController = () => {
  const {next, pause, resume, prev, playerState} = useContext(PlayerContext);

  const onPlay = useCallback(() => {
    if (!playerState) return;
    if (playerState.isPaused) resume();
    else pause();
  }, [playerState]);

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={prev}>
        <Icon name="skip-previous" color={COLORS.white} size={40} />
      </BorderlessButton>
      <BorderlessButton onPress={onPlay} style={styles.playButton}>
        <Icon
          name={playerState?.isPaused ? 'play' : 'pause'}
          color={COLORS.white}
          size={56}
        />
      </BorderlessButton>
      <BorderlessButton onPress={next}>
        <Icon name="skip-next" color={COLORS.white} size={40} />
      </BorderlessButton>
    </View>
  );
};

export default PlayerScreenController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  playButton: {
    marginHorizontal: '16%',
  },
});
