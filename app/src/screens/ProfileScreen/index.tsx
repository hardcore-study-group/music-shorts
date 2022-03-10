import {
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import BaseHeader from '../../components/BaseHeader';
import useNavigation from '../../hooks/useNavigation';
import InAppReview from 'react-native-in-app-review';
import Typography from '../../components/Typography';
import BaseButton from '../../components/BaseButton';
import {AuthContext} from '../../context/AuthContext';

const ProfileScreen = () => {
  const {navigate} = useNavigation();
  const {signOut} = useContext(AuthContext);

  const Options = [
    {
      title: 'Sign out',
      onPress: signOut,
    },
    {title: 'Rate us', onPress: () => InAppReview.RequestInAppReview()},
    {
      title: 'Privacy policy',
      onPress: () => Linking.openURL('https://music-shorts.com/privacy-policy'),
    },
    {title: 'Opensource license', onPress: () => navigate('Oss')},
    {
      title: 'Contect us',
      onPress: () => Linking.openURL('mailto:coderhyun476@gmail.com'),
    },
    {
      title: 'Github',
      onPress: () =>
        Linking.openURL('https://github.com/hardcore-study-group/music-shorts'),
    },
  ];

  return (
    <View style={{flex: 1}}>
      <BaseHeader title="Profile" />
      <FlatList
        data={Options}
        renderItem={({item}) => (
          <BaseButton style={styles.optionContainer} onPress={item.onPress}>
            <Typography style={styles.optionTitle}>{item.title}</Typography>
          </BaseButton>
        )}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  optionContainer: {
    width: '100%',
    height: 64,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  optionTitle: {
    fontWeight: 'bold',
  },
});
