import {StatusBar, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigations';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </>
  );
};

export default App;
