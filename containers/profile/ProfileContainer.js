import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../../containers/auth/LoginForm';
import { logout } from '../../module/redux/user';
import Profile from '../../components/profile/Profile';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  const onLogout = () => {
    dispatch(logout());
  };

  return <Profile user={user} onLogout={onLogout} />;
};

export default ProfileContainer;
