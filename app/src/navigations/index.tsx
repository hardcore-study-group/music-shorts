import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootStackNavigation, {RootStackParamList} from './RootStackNavigation';

import React from 'react';

export type NavigationParamList = RootStackParamList;

const Navigation = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, background: '#222'},
      }}>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
