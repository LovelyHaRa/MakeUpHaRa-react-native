import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../module/redux/user';
import Profile from '../../components/profile/Profile';
import { useColorScheme } from 'react-native-appearance';

const ProfileContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const onScan = () => {
    navigation.push('Scan');
  };
  const onLogout = () => {
    dispatch(logout());
  };

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
