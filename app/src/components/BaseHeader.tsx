import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, STATUSBAR_HEIGHT} from '../constants/styles';
import BorderlessButton from './BorderlessButton';
import Typography from './Typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BaseHeaderProps {
  right?: React.ReactNode;
  title?: string;
  canGoBack?: boolean;
}

const BaseHeader: React.FC<BaseHeaderProps> = props => {
  const {canGoBack, right, title} = props;

  return (
    <View style={styles.container}>
      {canGoBack && (
        <BorderlessButton style={styles.left}>
          <Icon name="chevron-left" size={24} color={COLORS.white} />
        </BorderlessButton>
      )}
      <Typography
        style={[styles.title, {textAlign: canGoBack ? 'center' : 'left'}]}
      >
        {title}
      </Typography>
      {right && <View style={styles.right}>{right}</View>}
    </View>
  );
};

BaseHeader.defaultProps = {
  canGoBack: true,
};

export default BaseHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56 + STATUSBAR_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: STATUSBAR_HEIGHT,
    bottom: 0,
  },
  right: {
    height: 56,
    position: 'absolute',
    right: 0,
    top: STATUSBAR_HEIGHT,
    bottom: 0,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
});
