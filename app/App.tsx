import {StatusBar, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigations';
import {COLORS} from './src/constants/styles';
import AuthProvider from './src/context/AuthContext';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <AuthProvider>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />

        <Navigation />
      </View>
    </AuthProvider>
  );
};

export default App;
