import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import palette from '../../lib/styles/open-color';
import ResponsiveView from './ResponsiveView';

const LoadingComponent = ({ colorScheme, hasMarginTop }) => {
  return (
    <ResponsiveView
      conatinerStyle={[
        styles.container,
        styles.loading,
        colorScheme === 'dark' ? styles.darkLoading : styles.lightLoading,
        hasMarginTop && styles.hasMarginTop,
      ]}
    >
      <ActivityIndicator size="large" color="#d6336c" />
    </ResponsiveView>
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
  hasMarginTop: {
    marginTop: 16,
  },
});

export default LoadingComponent;
