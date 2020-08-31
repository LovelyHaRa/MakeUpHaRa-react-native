import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../module/redux/user';
import Profile from '../../components/profile/Profile';
import { useColorScheme } from 'react-native-appearance';

const ProfileContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  const onScan = useCallback(() => {
    navigation.push('Scan');
  }, [navigation]);
  
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Profile
      colorScheme={colorScheme}
      user={user}
      onScan={onScan}
      onLogout={onLogout}
    />
  );
};

export default ProfileContainer;
