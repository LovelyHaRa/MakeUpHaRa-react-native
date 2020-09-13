import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './StyleContainer';
import { MaterialIcons } from '@expo/vector-icons';

export default function TitleWithBackButton({
  children,
  colorScheme,
  handleBackPress,
}) {
  return (
    <View style={styles.titleContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => handleBackPress()}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={36}
          color={
            colorScheme === 'dark'
              ? styles.darkTitle.color
              : styles.lightTitle.color
          }
        />
      </TouchableOpacity>
      {children}
    </View>
  );
}
