import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootStackNavigation, {RootStackParamList} from './RootStackNavigation';
import React, {useContext} from 'react';
import {COLORS} from '../constants/styles';
import {AuthContext} from '../context/AuthContext';
import AuthStackNavigation, {AuthStackParamList} from './AuthStackNavigation';

export type NavigationParamList = RootStackParamList & AuthStackParamList;

const Navigation = () => {
  const {accessToken, isInstalled, isPremium} = useContext(AuthContext);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, background: COLORS.black},
      }}
    >
      {accessToken && isInstalled && isPremium ? (
        <RootStackNavigation />
      ) : (
        <AuthStackNavigation />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
