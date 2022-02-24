import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useNavigation from '../../hooks/useNavigation';
import {ApiConfig, ApiScope, auth, remote} from 'react-native-spotify-remote';

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
