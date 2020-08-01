import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './StyleContainer';
import { Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const AuthForm = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ba5370', '#f4e2d8']} style={{ flex: 1 }}>
        <View style={styles.centerFlex}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>MAKE UP HARA</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#ba5370"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#ba5370"
              style={styles.input}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="LOGIN" buttonStyle={styles.button} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AuthForm;
