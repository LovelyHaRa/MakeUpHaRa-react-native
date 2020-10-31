import React from 'react';
import { StyleSheet, Text } from 'react-native';
import palette from '../../lib/styles/open-color';
import ResponsiveView from './ResponsiveView';

const AccessDenied = ({ target, colorScheme }) => {
  return (
    <ResponsiveView
      containerStyle={[
        styles.container,
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
      ]}
    >
      <Text
        style={[
          styles.title,
          colorScheme === 'dark' ? styles.darkText : styles.lightText,
        ]}
      >
        {target}에 대한 접근 권한이 없습니다.
      </Text>
      <Text style={colorScheme === 'dark' ? styles.darkText : styles.lightText}>
        <Text
          style={
            colorScheme === 'dark'
              ? styles.darkThemeColor
              : styles.lightThemeColor
          }
        >
          [설정] - [애플리케이션]
        </Text>{' '}
        에서 접근 권한을 확인해 주십시오.
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

export default AccessDenied;
