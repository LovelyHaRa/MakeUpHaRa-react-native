import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import CustomStatusBar from './CustomStatusBar';
import palette from '../../lib/styles/open-color';

const LoadingComponent = ({colorScheme}) => {
  return (
    <View
      style={[
        { ...styles.container, ...styles.loading },
        colorScheme === 'dark'
          ? { ...styles.darkLoading }
          : { ...styles.lightLoading },
      ]}
    >
      <CustomStatusBar colorScheme={colorScheme} />
      <ActivityIndicator size="large" color="#d6336c" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightLoading: {
    backgroundColor: palette.gray[0],
  },
  darkLoading: {
    backgroundColor: palette.gray[9],
  },
});

export default LoadingComponent;
