import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './StyleContainer';
import { Button } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import palette from '../../lib/styles/open-color';
import LoadingComponent from '../common/LoadingComponent';

const AuthForm = ({
  type = 'login',
  form,
  onChange,
  onSubmit,
  error,
  user,
  navigation,
}) => {
  if (user) {
    return <LoadingComponent />;
  }
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.centerFlex,
          colorScheme === 'dark'
            ? { ...styles.darkBody }
            : { ...styles.lightBody },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text
            style={[
              styles.logo,
              colorScheme === 'dark'
                ? { ...styles.darkText }
                : { ...styles.lightText },
            ]}
          >
            {type === 'login' ? '로그인' : '회원가입'}
          </Text>
          <Text
            style={[
              styles.subTitle,
              colorScheme === 'dark'
                ? { ...styles.darkSubText }
                : { ...styles.lightSubText },
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
              colorScheme === 'dark'
                ? { ...styles.darkInput }
                : { ...styles.lightInput },
            ]}
            value={form.username}
            onChangeText={(text) => onChange('username', text)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={
              colorScheme === 'dark' ? palette.violet[5] : palette.pink[7]
            }
            style={[
              styles.input,
              colorScheme === 'dark'
                ? { ...styles.darkInput }
                : { ...styles.lightInput },
            ]}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(text) => onChange('password', text)}
          />
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
                    ? { ...styles.darkInput }
                    : { ...styles.lightInput },
                ]}
                secureTextEntry={true}
                value={form.passwordConfirm}
                onChangeText={(text) => onChange('passwordConfirm', text)}
              />
              <TextInput
                placeholder="Name"
                placeholderTextColor={
                  colorScheme === 'dark' ? palette.violet[5] : palette.pink[7]
                }
                style={[
                  styles.input,
                  colorScheme === 'dark'
                    ? { ...styles.darkInput }
                    : { ...styles.lightInput },
                ]}
                value={form.name}
                onChangeText={(text) => onChange('name', text)}
              />
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={type === 'login' ? 'LOGIN' : '회원가입'}
            buttonStyle={[
              styles.button,
              colorScheme === 'dark'
                ? { ...styles.darkLoginButton }
                : { ...styles.lightLoginButton },
            ]}
            onPress={onSubmit}
          />
          {type === 'login' ? (
            <Button
              title="회원가입"
              buttonStyle={[
                styles.button,
                colorScheme === 'dark'
                  ? { ...styles.darkSignUpButton }
                  : { ...styles.lightSignUpButton },
              ]}
              onPress={() => {
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
                      ? { ...styles.darkThemeColor }
                      : { ...styles.lightThemeColor },
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
          colorScheme === 'dark'
            ? { ...styles.darkBody }
            : { ...styles.lightBody },
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
  );
};

export default AuthForm;