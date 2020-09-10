import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../module/redux/user';
import Profile from '../../components/profile/Profile';
import { useColorScheme } from 'react-native-appearance';

const ProfileContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  const ProfileMenuList = [
    { id: 'codeRegist', name: '문서 바코드 등록' },
    { id: 'changePassword', name: '비밀번호 변경' },
    { id: 'logout', name: '로그아웃' },
  ];

  const handleItemPress = useCallback(
    (item) => {
      switch (item) {
        case 'codeRegist':
          navigation.push('Scan');
          break;
        case 'changePassword':
          navigation.push('ChangePassword');
          break;
        case 'logout':
          dispatch(logout());
          break;
      }
    },
    [navigation, dispatch],
  );

  return (
    <Profile
      colorScheme={colorScheme}
      ProfileMenuList={ProfileMenuList}
      user={user}
      handleItemPress={handleItemPress}
    />
  );
};

export default ProfileContainer;
