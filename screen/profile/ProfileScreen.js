import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../../containers/auth/LoginForm';
import Profile from '../../components/profile/Profile';

const Stack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileScreen;
