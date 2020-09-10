import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import CustomStatusBar from '../common/CustomStatusBar';
import DismissKeyboard from '../common/DismissKeyboard';
import { styles } from './StyleContainer';
import { MaterialIcons } from '@expo/vector-icons';
import palette from '../../lib/styles/open-color';

const ChangePassword = ({ colorScheme }) => {
  return (
    <DismissKeyboard>
      <View
        style={[
          styles.container,
          colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
        ]}
      >
        <CustomStatusBar colorScheme={colorScheme} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={36}
              color={
                colorScheme === 'dark'
                  ? styles.darkText.color
                  : styles.lightText.color
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.centerFlex}>
          <View style={styles.changePasswordTitleContainer}>
            <Text
              style={[
                styles.changePasswordTitle,
                colorScheme === 'dark' ? styles.darkText : styles.lightText,
              ]}
            >
              비밀번호 변경
            </Text>
            <Text
              style={[
                styles.changePasswordSubTitle,
                colorScheme === 'dark' ? styles.darkText : styles.lightText,
              ]}
            >
              비밀번호를 변경할 수 있습니다.
            </Text>
          </View>
          <View style={styles.changePasswordInputContainer}>
            <TextInput
              placeholder="기존 비밀번호"
              placeholderTextColor={
                colorScheme === 'dark' ? palette.violet[5] : palette.pink[7]
              }
              style={[
                styles.changePasswordInput,
                colorScheme === 'dark'
                  ? styles.darkChangePasswordInput
                  : styles.lightChangePasswordInput,
              ]}
            />
            <TextInput
              placeholder="새로운 비밀번호"
              placeholderTextColor={
                colorScheme === 'dark' ? palette.violet[5] : palette.pink[7]
              }
              style={[
                styles.changePasswordInput,
                colorScheme === 'dark'
                  ? styles.darkChangePasswordInput
                  : styles.lightChangePasswordInput,
              ]}
            />
            <TextInput
              placeholderTextColor={
                colorScheme === 'dark' ? palette.violet[5] : palette.pink[7]
              }
              placeholder="새로운 비밀번호 확인"
              style={[
                styles.changePasswordInput,
                colorScheme === 'dark'
                  ? styles.darkChangePasswordInput
                  : styles.lightChangePasswordInput,
              ]}
            />
          </View>
          <View style={styles.changePasswordButtonContainer}>
            <Button
              title="비밀번호 변경"
              buttonStyle={[
                styles.changePasswordButton,
                colorScheme === 'dark'
                  ? styles.darkChangePasswordButton
                  : styles.lightChangePasswordButton,
              ]}
            />
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default ChangePassword;
