import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootStackNavigation, {RootStackParamList} from './RootStackNavigation';
//@ts-ignore
import {AppInstalledChecker} from 'react-native-check-app-install';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS} from '../constants/styles';
import CheckAppInstalledScreen from '../screens/CheckAppInstalledScreen';
import {BASE_URL} from '../constants/values';
import {AuthContext} from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import PremiumScreen from '../screens/PremiumScreen';

export type NavigationParamList = RootStackParamList;

const Navigation = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const {accessToken, isPremium} = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      AppInstalledChecker.checkURLScheme('spotify').then(
        (_isInstalled: boolean) => setIsInstalled(_isInstalled),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
