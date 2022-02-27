import React from 'react';
import {View, StyleSheet, FlatList, Linking} from 'react-native';
import {COLORS, STATUSBAR_HEIGHT} from '../../constants/styles';
import oss from '../../assets/oss.json';
import BaseHeader from '../../components/BaseHeader';
import BaseButton from '../../components/BaseButton';
import Typography from '../../components/Typography';

const DATA = Object.keys(oss).map(key => ({
  name: key,
  //@ts-ignore
  ...oss[key],
}));

const OssScreen = () => {
  return (
    <View style={{flex: 1}}>
      <BaseHeader title="Opensource license" />
      <FlatList
        data={DATA}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <BaseButton
            onPress={() => Linking.openURL(item.repository)}
            style={styles.container}
          >
            <Typography style={styles.name}>{item.name}</Typography>
            <Typography style={styles.repository}>{item.repository}</Typography>
            <Typography style={styles.licenses}>{item.licenses}</Typography>
          </BaseButton>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  name: {},
  repository: {
    fontSize: 12,
    marginTop: 4,
  },
  licenses: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default OssScreen;
