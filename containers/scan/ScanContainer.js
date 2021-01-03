import React, { useCallback, useEffect, useState } from 'react';
import ScanComponent from '../../components/scan/ScanComponent';
import { useColorScheme } from 'react-native-appearance';
import { Platform } from 'react-native';
import NotSupported from '../../components/common/NotSupported';
import { useDispatch } from 'react-redux';
import { getDocumentByBarcode } from '../../module/redux/scan';
import { useFocusEffect } from '@react-navigation/native';

const ScanContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [onCamera, setOnCamera] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setOnCamera(true);
      }, 500);
      return () => {
        setOnCamera(false);
      };
    }, []),
  );

  const handlePress = useCallback(
    (data) => {
      dispatch(getDocumentByBarcode({ code: data }));
      navigation.push('ResultComponent');
    },
    [dispatch, navigation],
  );

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (Platform.OS === 'web') {
    return <NotSupported target={'Web'} colorScheme={colorScheme} />;
  }

  return (
    <ScanComponent
      onCamera={onCamera}
      colorScheme={colorScheme}
      handlePress={handlePress}
      handleBackPress={handleBackPress}
      buttonText={'문서 보기'}
    />
  );
};

export default ScanContainer;
