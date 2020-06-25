import React, { useEffect, useState } from 'react';
import ScanComponent from '../../components/scan/ScanComponent';
import { useColorScheme } from 'react-native-appearance';

const ScanContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [onCamera, setOnCamera] = useState(false);
  useEffect(() => {
    navigation.addListener('focus', () => {
      setOnCamera(true);
    });
    navigation.addListener('blur', () => {
      setOnCamera(false);
    });
    return () => {
      setOnCamera(false);
    };
  }, [navigation]);
  return (
    <ScanComponent
      navigation={navigation}
      onCamera={onCamera}
      colorScheme={colorScheme}
    />
  );
};

export default ScanContainer;
