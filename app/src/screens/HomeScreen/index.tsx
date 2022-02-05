import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useNavigation from '../../hooks/useNavigation';

const HomeScreen = () => {
  const {navigate} = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="playlist" onPress={() => navigate('Playlist')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
