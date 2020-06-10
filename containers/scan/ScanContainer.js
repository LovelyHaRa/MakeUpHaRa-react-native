import React, { useEffect, useState } from 'react';
import ScanComponent from '../../components/scan/ScanComponent';

const ScanContainer = ({ navigation }) => {
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
  return <ScanComponent navigation={navigation} onCamera={onCamera} />;
};

export default ScanContainer;
