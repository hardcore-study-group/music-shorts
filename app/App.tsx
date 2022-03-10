import {LogBox, StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigations';
import {COLORS} from './src/constants/styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PlayerProvider from './src/context/PlayerContext';
import AuthProvider from './src/context/AuthContext';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './src/config/reactQuery';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PlayerProvider>
            <SafeAreaProvider>
              <View style={{flex: 1, backgroundColor: COLORS.black}}>
                <StatusBar
                  backgroundColor="transparent"
                  barStyle="light-content"
                  translucent
                />
                <Navigation />
              </View>
            </SafeAreaProvider>
          </PlayerProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
