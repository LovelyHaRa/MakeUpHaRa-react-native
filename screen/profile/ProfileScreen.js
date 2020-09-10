import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../../containers/auth/LoginForm';
import ProfileContainer from '../../containers/profile/ProfileContainer';
import { useSelector } from 'react-redux';
import RegisterForm from '../../containers/auth/RegisterForm';
import ScanContainer from '../../containers/profile/ScanContainer';
import BarcodeRegistContainer from '../../containers/profile/BarcodeRegistContainer';
import ChangePasswordContainer from '../../containers/profile/ChangePasswordContainer';

const Stack = createStackNavigator();

const ProfileScreen = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);
  return (
    <Stack.Navigator headerMode="none">
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Profile" component={ProfileContainer} />
          <Stack.Screen name="Scan" component={ScanContainer} />
          <Stack.Screen
            name="BarcodeRegist"
            component={BarcodeRegistContainer}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordContainer}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Register" component={RegisterForm} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ProfileScreen;
