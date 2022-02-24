import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootStackNavigation, {RootStackParamList} from './RootStackNavigation';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS} from '../constants/styles';
import CheckAppInstalledScreen from '../screens/CheckAppInstalledScreen';
import {AuthContext} from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import PremiumScreen from '../screens/PremiumScreen';
import {Linking} from 'react-native';

export type NavigationParamList = RootStackParamList;

const Navigation = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const {accessToken, isPremium} = useContext(AuthContext);

  useEffect(() => {
    // spotify install checker
    const interval = setInterval(async () => {
      const canOpen = await Linking.canOpenURL('spotify://');
      setIsInstalled(canOpen);
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
