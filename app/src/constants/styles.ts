import {Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('screen').height;
export const STATUSBAR_HEIGHT = getStatusBarHeight();

export const COLORS = {
  white: '#FFFFFF',
  black: '#222222',
  gray: '#888888',
  red: '#CC4444',
  spotify: '#1DB954',
  youtube: '#FF0100',
};
