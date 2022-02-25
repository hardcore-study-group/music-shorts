import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootStackNavigation, {RootStackParamList} from './RootStackNavigation';
import React, {useEffect} from 'react';
import {COLORS} from '../constants/styles';
import CheckAppInstalledScreen from '../screens/CheckAppInstalledScreen';
import LoginScreen from '../screens/LoginScreen';
import PremiumScreen from '../screens/PremiumScreen';
import {useRecoilValue, useRecoilRefresher_UNSTABLE} from 'recoil';
import {accessTokenQuery, isAppInstalledQuery} from '../recoil/auth';
import {meQuery} from '../recoil/me';

export type NavigationParamList = RootStackParamList;

const Navigation = () => {
  const accessToken = useRecoilValue(accessTokenQuery);
  const isInstalled = useRecoilValue(isAppInstalledQuery);
  const inInstalledRefresh = useRecoilRefresher_UNSTABLE(isAppInstalledQuery);
  const me = useRecoilValue(meQuery);

  useEffect(() => {
    // spotify install checker
    return () => clearInterval(setInterval(inInstalledRefresh, 1000));
  }, []);

  if (!isInstalled) return <CheckAppInstalledScreen />;
  if (!accessToken) return <LoginScreen />;
  if (me.product !== 'premium') return <PremiumScreen />;

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
