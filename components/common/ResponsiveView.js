import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import palette from '../../lib/styles/open-color';

const ResponsiveView = ({ children, containerStyle, colorScheme }) =>
  Platform.OS == 'ios' ? (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        translucent
      />
      <SafeAreaView
        style={[
          {
            backgroundColor: colorScheme
              ? colorScheme === 'dark'
                ? palette.gray[9]
                : palette.gray[0]
              : palette.gray[0],
          },
          ...containerStyle,
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  ) : (
    <View style={containerStyle}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={
          colorScheme === 'dark' ? palette.gray[9] : palette.gray[0]
        }
      />
      {children}
    </View>
  );

export default ResponsiveView;
