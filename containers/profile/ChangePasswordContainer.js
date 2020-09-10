import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import ChangePassword from '../../components/profile/ChangePassword';

const ChangePasswordContainer = () => {
  const colorScheme = useColorScheme();
  return <ChangePassword colorScheme={colorScheme} />;
};

export default ChangePasswordContainer;
