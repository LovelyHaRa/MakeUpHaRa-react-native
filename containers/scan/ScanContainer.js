import React, { useCallback, useEffect, useState } from 'react';
import ScanComponent from '../../components/scan/ScanComponent';
import { useColorScheme } from 'react-native-appearance';
import { Platform } from 'react-native';
import NotSupported from '../../components/common/NotSupported';
import { useDispatch } from 'react-redux';
import { getDocumentByBarcode } from '../../module/redux/scan';

const ScanContainer = ({ navigation }) => {
  const dispatch = useDispatch();
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
    (data) => {
      dispatch(getDocumentByBarcode({ code: data }));
      navigation.push('ResultComponent');
    },
    [dispatch, navigation],
  );

  if (Platform.OS === 'web') {
    return <NotSupported target={'Web'} colorScheme={colorScheme} />;
  }

  return (
    <ScanComponent
      onCamera={onCamera}
      colorScheme={colorScheme}
      handlePress={handlePress}
      buttonText={'문서 보기'}
    />
  );
};

export default ScanContainer;
