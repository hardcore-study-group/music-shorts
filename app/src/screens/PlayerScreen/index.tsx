import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export interface PlayerScreenProps {
  id?: string; // undifined meaning shuffle
}

const PlayerScreen = () => {
  return (
    <View>
      <Text>PlayerScreen</Text>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({});
