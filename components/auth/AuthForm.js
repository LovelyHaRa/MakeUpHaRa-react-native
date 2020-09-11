import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { styles } from './StyleContainer';
import { Button } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import palette from '../../lib/styles/open-color';
import LoadingComponent from '../common/LoadingComponent';
import DismissKeyboard from '../common/DismissKeyboard';
import CustomStatusBar from '../common/CustomStatusBar';

const AuthForm = ({
  type = 'login',
  form,
  isValid,
  validMessage,
  onChange,
  onSubmit,
  error,
  user,
  navigation,
}) => {
  const colorScheme = useColorScheme();
  const refInputPassword = useRef();
  const refInputConfirmPassword = useRef();
  const refInputName = useRef();

  if (user) {
    return <LoadingComponent />;
  }
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <CustomStatusBar colorScheme={colorScheme} />
        <View
          style={[
            styles.centerFlex,
            colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
          ]}
        >
          <View style={styles.logoContainer}>
            <Text
              style={[
                styles.logo,
                colorScheme === 'dark' ? styles.darkText : styles.lightText,
              ]}
            >
              {type === 'login' ? '로그인' : '회원가입'}
            </Text>
            <Text
              style={[
                styles.subTitle,
                colorScheme === 'dark'
                  ? styles.darkSubText
                  : styles.lightSubText,
              ]}
            >
              {type === 'login'
                ? '계속 진행하려면 사용자 정보가 필요합니다.'
                : '이메일 주소로 빠르게 가입할 수 있습니다.'}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email or ID"
              placeholderTextColor={
                colorScheme === 'dark' ? palette.violet[5] : palette.pink[7]
              }
              style={[
                styles.input,
                colorScheme === 'dark' ? styles.darkInput : styles.lightInput,
              ]}
              value={form.username}
              onChangeText={(text) => onChange('username', text)}
              onSubmitEditing={() => {
                refInputPassword.current.focus();
              }}
              blurOnSubmit={false}
              returnKeyType="next"
            />
            {type === 'register' && !isValid.username && (
              <Text style={styles.validText}>{validMessage.username}</Text>
            )}
            <TextInput
              placeholder="Password"
              placeholderTextColor={
                colorScheme === 'dark' ? palette.violet[5] : palette.pink[7]
              }
              style={[
                styles.input,
                colorScheme === 'dark' ? styles.darkInput : styles.lightInput,
              ]}
              secureTextEntry={true}
              value={form.password}
              onChangeText={(text) => onChange('password', text)}
              ref={refInputPassword}
              onSubmitEditing={() => {
                if (type === 'login') {
                  onSubmit();
                } else {
                  return refInputConfirmPassword.current.focus();
                }
              }}
              blurOnSubmit={type === 'login' ? true : false}
              returnKeyType={type === 'login' ? 'done' : 'next'}
            />
            {type === 'register' && !isValid.password && (
              <Text style={styles.validText}>{validMessage.password}</Text>
            )}
            {type === 'register' && (
              <>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={
                    colorScheme === 'dark' ? palette.violet[5] : palette.pink[7]
                  }
                  style={[
                    styles.input,
                    colorScheme === 'dark'
                      ? styles.darkInput
                      : styles.lightInput,
                  ]}
                  secureTextEntry={true}
                  value={form.passwordConfirm}
                  onChangeText={(text) => onChange('passwordConfirm', text)}
                  ref={refInputConfirmPassword}
                  onSubmitEditing={() => refInputName.current.focus()}
                  blurOnSubmit={false}
                  returnKeyType="next"
                />
                {type === 'register' && !isValid.passwordConfirm && (
                  <Text style={styles.validText}>
                    {validMessage.passwordConfirm}
                  </Text>
                )}
                <TextInput
                  placeholder="Name"
                  placeholderTextColor={
                    colorScheme === 'dark' ? palette.violet[5] : palette.pink[7]
                  }
                  style={[
                    styles.input,
                    colorScheme === 'dark'
                      ? styles.darkInput
                      : styles.lightInput,
                  ]}
                  value={form.name}
                  onChangeText={(text) => onChange('name', text)}
                  ref={refInputName}
                  returnKeyType="done"
                />
                {type === 'register' && !isValid.name && (
                  <Text style={styles.validText}>{validMessage.name}</Text>
                )}
              </>
            )}
          </View>
          {error && (
            <View
              style={[
                styles.errorContainer,
                colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
              ]}
            >
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title={type === 'login' ? 'LOGIN' : '회원가입'}
              buttonStyle={[
                styles.button,
                colorScheme === 'dark'
                  ? styles.darkLoginButton
                  : styles.lightLoginButton,
              ]}
              disabled={
                type === 'register' &&
                (!isValid.username ||
                  !isValid.password ||
                  !isValid.passwordConfirm ||
                  !isValid.name)
              }
              onPress={() => {
                Keyboard.dismiss();
                onSubmit();
              }}
            />
            {type === 'login' ? (
              <Button
                title="회원가입"
                buttonStyle={[
                  styles.button,
                  colorScheme === 'dark'
                    ? styles.darkSignUpButton
                    : styles.lightSignUpButton,
                ]}
                onPress={() => {
                  Keyboard.dismiss();
                  navigation.push('Register');
                }}
              />
            ) : (
              <View style={styles.goBacktoLogin}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text
                    style={[
                      colorScheme === 'dark'
                        ? styles.darkThemeColor
                        : styles.lightThemeColor,
                    ]}
                  >
                    로그인 페이지로 돌아가기.
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View
          style={[
            styles.footerContainer,
            colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
          ]}
        >
          <Text
            style={[
              styles.footer,
              colorScheme === 'dark'
                ? { ...styles.darkSubText }
                : { ...styles.lightSubText },
            ]}
          >
            MAKE UP HARA
          </Text>
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default AuthForm;
