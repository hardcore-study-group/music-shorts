import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import PlaylistScreen from '../screens/PlaylistScreen';

export type RootStackParamList = {
  Home: undefined;
  Playlist: undefined;
  Profile: undefined;
  Player: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{animation: 'slide_from_right'}}
    >
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen name="Playlist" component={PlaylistScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigation;
