import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import OssScreen from '../screens/OssScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';

export type RootStackParamList = {
  Home: undefined;
  Playlist: undefined;
  Profile: undefined;
  Oss: undefined;
  SignIn: undefined;
  SignInWithSpotify: undefined;
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
      <RootStack.Screen name="Profile" component={ProfileScreen} />
      <RootStack.Screen name="Oss" component={OssScreen} />
      <RootStack.Screen name="SignIn" component={SignInScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigation;
