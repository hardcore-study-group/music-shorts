import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootStackNavigation, {RootStackParamList} from './RootStackNavigation';
import React, {useEffect} from 'react';
import {COLORS} from '../constants/styles';
import CheckAppInstalledScreen from '../screens/CheckAppInstalledScreen';
import LoginScreen from '../screens/LoginScreen';
import PremiumScreen from '../screens/PremiumScreen';
import {useRecoilValueLoadable, useRecoilRefresher_UNSTABLE} from 'recoil';
import {accessTokenQuery, isAppInstalledQuery} from '../recoil/auth';
import {meQuery} from '../recoil/me';
import ActivityindicatorView from '../components/ActivityIndicatorView';

export type NavigationParamList = RootStackParamList;

const Navigation = () => {
  const accessToken = useRecoilValueLoadable(accessTokenQuery);
  const isInstalled = useRecoilValueLoadable(isAppInstalledQuery);
  const inInstalledRefresh = useRecoilRefresher_UNSTABLE(isAppInstalledQuery);
  const me = useRecoilValueLoadable(meQuery);

  useEffect(() => {
    // spotify install checker
    return () => clearInterval(setInterval(inInstalledRefresh, 1000));
  }, []);

  if (
    isInstalled.state === 'loading' ||
    accessToken.state === 'loading' ||
    me.state === 'loading'
  )
    return <ActivityindicatorView />;
  if (!isInstalled.contents) return <CheckAppInstalledScreen />;
  if (!accessToken.contents) return <LoginScreen />;
  if (me.contents.product !== 'premium') return <PremiumScreen />;

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
