import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootStackNavigation, {RootStackParamList} from './RootStackNavigation';
import React, {useContext} from 'react';
import {COLORS} from '../constants/styles';
import CheckAppInstalledScreen from '../screens/CheckAppInstalledScreen';
import LoginScreen from '../screens/LoginScreen';
import PremiumScreen from '../screens/PremiumScreen';
import {AuthContext} from '../context/AuthContex';

export type NavigationParamList = RootStackParamList;

const Navigation = () => {
  const {accessToken, isInstalled, isPremium} = useContext(AuthContext);

  if (!isInstalled) return <CheckAppInstalledScreen />;
  if (!accessToken) return <LoginScreen />;
  if (!isPremium) return <PremiumScreen />;

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, background: COLORS.black},
      }}
    >
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
