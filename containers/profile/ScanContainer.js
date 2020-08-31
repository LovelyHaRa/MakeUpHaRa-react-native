import React, { useCallback, useEffect, useState } from 'react';
import ScanComponent from '../../components/scan/ScanComponent';
import { useColorScheme } from 'react-native-appearance';
import { Platform } from 'react-native';
import NotSupported from '../../components/common/NotSupported';

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

  const handlePress = useCallback(
    (code) => {
      navigation.push('BarcodeRegist', { code });
    },
    [navigation],
  );

  if (Platform.OS === 'web') {
    return <NotSupported target={'Web'} colorScheme={colorScheme} />;
  }

  return (
    <ScanComponent
      onCamera={onCamera}
      colorScheme={colorScheme}
      handlePress={handlePress}
      buttonText={'코드 등록'}
    />
  );
};

export default ScanContainer;
