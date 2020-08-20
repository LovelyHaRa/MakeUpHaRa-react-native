import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BarcodeRegist from '../../components/profile/BarcodeRegist';
import { initialize, setActionState } from '../../module/redux/search';
import { initializeSearchList as initWikiSearch } from '../../module/redux/wiki';
import { initializeSearchList as initPostSearch } from '../../module/redux/post';
import { useColorScheme } from 'react-native-appearance';

const BarcodeRegistContainer = ({ route }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const { code: barcode } = route.params;

  const [query, setQuery] = useState('');

  const handleQueryChange = (query) => {
    setQuery(query);
  };

  const handleSubmit = () => {};

  useEffect(() => {
    dispatch(initialize());
    dispatch(initWikiSearch());
    dispatch(initPostSearch());
    dispatch(setActionState(false));
  }, [dispatch]);
  return (
    <BarcodeRegist
      barcode={barcode}
      inputQuery={query}
      handleQueryChange={handleQueryChange}
      handleSubmit={handleSubmit}
      colorScheme={colorScheme}
    />
  );
};

export default BarcodeRegistContainer;
