import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../../containers/auth/LoginForm';
import ProfileContainer from '../../containers/profile/ProfileContainer';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const ProfileScreen = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    // setIsLoggedIn(!!user);
  }, [user]);
  return (
    <Stack.Navigator headerMode="none">
      {isLoggedIn ? (
        <Stack.Screen name="Profile" component={ProfileContainer} />
      ) : (
        <Stack.Screen name="Login" component={LoginForm} />
      )}
    </Stack.Navigator>
  );
};

export default ProfileScreen;
