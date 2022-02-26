import {LogBox, StatusBar, View} from 'react-native';
import React, {Suspense, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigations';
import {COLORS} from './src/constants/styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import ActivityindicatorView from './src/components/ActivityIndicatorView';
import {auth} from 'react-native-spotify-remote';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  // auth.endSession();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RecoilRoot>
        <SafeAreaProvider>
          <View style={{flex: 1, backgroundColor: COLORS.black}}>
            <StatusBar
              backgroundColor="transparent"
              barStyle="light-content"
              translucent
            />
            <Suspense fallback={<ActivityindicatorView />}>
              <Navigation />
            </Suspense>
          </View>
        </SafeAreaProvider>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
};

export default App;
