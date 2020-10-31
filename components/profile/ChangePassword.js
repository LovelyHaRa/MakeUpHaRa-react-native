import React from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import DismissKeyboard from '../common/DismissKeyboard';
import { styles } from './StyleContainer';
import { MaterialIcons } from '@expo/vector-icons';
import palette from '../../lib/styles/open-color';
import ResponsiveView from '../common/ResponsiveView';

const ChangePassword = ({
  colorScheme,
  form,
  handleBackButton,
  handleChange,
  handleSubmit,
  isValid,
  validMessage,
  submitPassword,
  changePasswordLoading,
}) => {
  const { curPassword, newPassword, confirmPassword } = form;
  return (
    <DismissKeyboard>
      <ResponsiveView
        containerStyle={[
          styles.container,
          colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
        ]}
        colorScheme={colorScheme}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => handleBackButton()}
          >
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
              secureTextEntry={true}
              value={curPassword}
              onChangeText={(text) => handleChange('curPassword', text)}
            />
            {!isValid.curPassword && validMessage.curPassword && (
              <Text style={styles.validText}>{validMessage.curPassword}</Text>
            )}
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
              secureTextEntry={true}
              value={newPassword}
              onChangeText={(text) => handleChange('newPassword', text)}
            />
            {!isValid.newPassword && validMessage.newPassword && (
              <Text style={styles.validText}>{validMessage.newPassword}</Text>
            )}
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
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => handleChange('confirmPassword', text)}
            />
            {!isValid.confirmPassword && validMessage.confirmPassword && (
              <Text style={styles.validText}>
                {validMessage.confirmPassword}
              </Text>
            )}
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
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
              disabled={
                !isValid.curPassword ||
                !isValid.newPassword ||
                !isValid.confirmPassword
              }
              loading={changePasswordLoading}
            />
          </View>
          {submitPassword.message && (
            <View style={styles.changePasswordResultContainer}>
              <Text
                style={
                  submitPassword.result
                    ? colorScheme === 'dark'
                      ? styles.darkThemeColor
                      : styles.lightThemeColor
                    : styles.errorText
                }
              >
                {submitPassword.message}
              </Text>
            </View>
          )}
        </View>
      </ResponsiveView>
    </DismissKeyboard>
  );
};

export default ChangePassword;
