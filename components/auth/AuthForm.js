import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './StyleContainer';
import { Button } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import palette from '../../lib/styles/open-color';
import LoadingComponent from '../common/LoadingComponent';

const AuthForm = ({ type, form, onChange, onSubmit, error, user }) => {
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
            로그인
          </Text>
          <Text
            style={[
              styles.subTitle,
              colorScheme === 'dark'
                ? { ...styles.darkSubText }
                : { ...styles.lightSubText },
            ]}
          >
            계속 진행하려면 사용자 정보가 필요합니다.
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
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="LOGIN"
            buttonStyle={[
              styles.button,
              colorScheme === 'dark'
                ? { ...styles.darkLoginButton }
                : { ...styles.lightLoginButton },
            ]}
            onPress={onSubmit}
          />
          <Button
            title="회원가입"
            buttonStyle={[
              styles.button,
              colorScheme === 'dark'
                ? { ...styles.darkSignUpButton }
                : { ...styles.lightSignUpButton },
            ]}
          />
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
