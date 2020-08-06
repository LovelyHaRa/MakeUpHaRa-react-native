import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './StyleContainer';
import { Button } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import palette from '../../lib/styles/open-color';

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
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
            MAKE UP HARA
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
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
    </View>
  );
};

export default AuthForm;
