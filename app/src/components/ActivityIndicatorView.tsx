import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/styles';

const ActivityindicatorView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={COLORS.white} />
    </View>
  );
};

export default ActivityindicatorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
