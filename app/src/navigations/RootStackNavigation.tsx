import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import PlayerScreen, {PlayerScreenProps} from '../screens/PlayerScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Home: undefined;
  Playlist: undefined;
  Profile: undefined;
  Player: PlayerScreenProps;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{animation: 'slide_from_right', headerShown: false}}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Playlist" component={PlaylistScreen} />
      <RootStack.Screen name="Player" component={PlayerScreen} />
      <RootStack.Screen name="Profile" component={ProfileScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigation;
