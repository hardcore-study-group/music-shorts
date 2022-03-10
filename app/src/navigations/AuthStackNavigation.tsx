import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import useNavigation from '../hooks/useNavigation';
import CheckAppInstalledScreen from '../screens/CheckAppInstalledScreen';
import LoginScreen from '../screens/LoginScreen';
import PremiumScreen from '../screens/PremiumScreen';

export type AuthStackParamList = {
  CheckAppInstalled: undefined;
  Login: undefined;
  Premium: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigation = () => {
  const {reset} = useNavigation();
  const {accessToken, isInstalled, isPremium} = useContext(AuthContext);

  useEffect(() => {
    if (!isInstalled) return reset({routes: [{name: 'CheckAppInstalled'}]});
    if (!accessToken) return reset({routes: [{name: 'Login'}]});
    if (!isPremium) return reset({routes: [{name: 'Premium'}]});
  }, [accessToken, isInstalled, isPremium]);

  return (
    <AuthStack.Navigator
      initialRouteName="CheckAppInstalled"
      screenOptions={{animation: 'slide_from_right', headerShown: false}}
    >
      <AuthStack.Screen
        name="CheckAppInstalled"
        component={CheckAppInstalledScreen}
      />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Premium" component={PremiumScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigation;
