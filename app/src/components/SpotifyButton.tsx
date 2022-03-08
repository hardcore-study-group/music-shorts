import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/styles';
import Typography from './Typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseButton from './BaseButton';

interface SpotifyButtonProps {
  title: string;
  onPress?: () => void;
}

const SpotifyButton: React.FC<SpotifyButtonProps> = ({onPress, title}) => {
  return (
    <BaseButton onPress={onPress} style={styles.container}>
      <Icon name="spotify" size={24} color={COLORS.white} />
      <Typography style={styles.title}>{title}</Typography>
    </BaseButton>
  );
};

export default SpotifyButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    backgroundColor: COLORS.spotify,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
