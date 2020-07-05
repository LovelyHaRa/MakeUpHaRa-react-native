import React, { useEffect, useState } from 'react';
import ScanComponent from '../../components/scan/ScanComponent';
import { useColorScheme } from 'react-native-appearance';
import { Platform } from 'react-native';

const ScanContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [onCamera, setOnCamera] = useState(false);
  useEffect(() => {
    const e = navigation.addListener('focus', () => {
      setOnCamera(true);
    });
    return e;
  }, [navigation]);

  useEffect(() => {
    const e = navigation.addListener('blur', () => {
      setOnCamera(false);
    });
    return e;
  }, [navigation]);
  if (Platform.OS === 'web') {
    return null;
  }
  return (
    <ScanComponent
      navigation={navigation}
      onCamera={onCamera}
      colorScheme={colorScheme}
    />
  );
};

export default ScanContainer;
