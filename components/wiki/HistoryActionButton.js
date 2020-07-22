import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './StyleContainer';
import { getHistory } from '../../module/redux/scan';

const HistoryActionButton = ({
  navigation,
  colorScheme,
  dispatch,
  title,
  component,
}) => {
  return (
    <View style={styles.buttonSection}>
      <TouchableOpacity
        style={[
          { ...styles.button, ...styles.buttonFirst },
          colorScheme === 'dark'
            ? { ...styles.darkButton }
            : { ...styles.lightButton },
        ]}
        onPress={() => {
          dispatch(getHistory({ title: title.name }));
          navigation.push(component);
        }}
      >
        <Text>히스토리</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          { ...styles.button },
          colorScheme === 'dark'
            ? { ...styles.darkButton }
            : { ...styles.lightButton },
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text>뒤로가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryActionButton;
