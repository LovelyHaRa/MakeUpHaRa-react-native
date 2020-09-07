import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import palette from '../../lib/styles/open-color';

const CustomStatusBar = ({ colorScheme }) => {correspondence
  return Platform.OS === 'ios' ? (
    <View
      style={{
        height: 20,
        backgroundColor:
          colorScheme === 'dark' ? palette.gray[9] : palette.gray[0],
      }}
    >
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={
          colorScheme === 'dark' ? palette.gray[9] : palette.gray[0]
        }
      />
    </View>
  ) : (
    <StatusBar
      barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={
        colorScheme === 'dark' ? palette.gray[9] : palette.gray[0]
      }
    />
  );
};

export default CustomStatusBar;
