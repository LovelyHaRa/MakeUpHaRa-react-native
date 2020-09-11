import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './StyleContainer';

const HistoryActionButton = ({
  navigation,
  colorScheme,
  getHistory,
  dispatch,
  title,
  component,
  handleHistoryPress,
  handleBackPress,
}) => {
  return (
    <View style={styles.buttonSection}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonFirst,
          colorScheme === 'dark' ? styles.darkButton : styles.lightButton,
        ]}
        onPress={() => handleHistoryPress(title.name)}
      >
        <Text>히스토리</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          colorScheme === 'dark' ? styles.darkButton : styles.lightButton,
        ]}
        onPress={() => handleBackPress()}
      >
        <Text>뒤로가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryActionButton;
