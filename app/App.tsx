import {StatusBar, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigations';
import {COLORS} from './src/constants/styles';
import AuthProvider from './src/context/AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
};

export default App;
