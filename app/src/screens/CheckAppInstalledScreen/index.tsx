import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BaseHeader from '../../components/BaseHeader';

const CheckAppInstalledScreen = () => {
  return (
    <View style={{flex: 1}}>
      <BaseHeader canGoBack={false} title="Spotify app is not installed" />
    </View>
  );
};

export default CheckAppInstalledScreen;

const styles = StyleSheet.create({});
