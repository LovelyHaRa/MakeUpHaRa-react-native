import React from 'react';
import { StyleSheet, Text } from 'react-native';
import palette from '../../lib/styles/open-color';
import ResponsiveView from './ResponsiveView';

const NotSupported = ({ target, colorScheme }) => {
  return (
    <ResponsiveView
      containerStyle={[
        styles.container,
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
      ]}
      colorScheme={colorScheme}
    >
      <Text
        style={[
          styles.title,
          colorScheme === 'dark' ? styles.darkText : styles.lightText,
        ]}
      >
        해당 기능은{' '}
        <Text
          style={
            colorScheme === 'dark'
              ? styles.darkThemeColor
              : styles.lightThemeColor
          }
        >
          [{target}]
        </Text>
        에서 접근할 수 없습니다.
      </Text>
    </ResponsiveView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightBody: {
    backgroundColor: palette.gray[0],
  },
  darkBody: {
    backgroundColor: palette.gray[9],
  },
  title: { fontSize: 20, fontFamily: 'NanumGothic_400Regular', margin: 20 },
  lightText: {
    color: palette.gray[9],
  },
  darkText: {
    color: palette.gray[0],
  },
  lightThemeColor: {
    color: palette.cyan[7],
  },
  darkThemeColor: {
    color: palette.violet[7],
  },
});

export default NotSupported;
