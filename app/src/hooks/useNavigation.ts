import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationParamList} from '../navigations';
import {useNavigation as _useNavigation} from '@react-navigation/core';

const useNavigation = () =>
  _useNavigation<NativeStackNavigationProp<NavigationParamList>>();

export default useNavigation;
