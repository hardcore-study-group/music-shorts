import {ActivityIndicator, StatusBar, View} from 'react-native';
import React, {Suspense, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigations';
import {COLORS} from './src/constants/styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import Typography from './src/components/Typography';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <View style={{flex: 1, backgroundColor: COLORS.black}}>
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
            translucent
          />
          <Suspense
            fallback={<ActivityIndicator style={{alignSelf: 'center'}} />}
          >
            <Navigation />
          </Suspense>
        </View>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default App;
