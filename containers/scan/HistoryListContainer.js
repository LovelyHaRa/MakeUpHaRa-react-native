import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HistoryListComponent from '../../components/scan/HistoryListComponent';
import { useColorScheme } from 'react-native-appearance';

const HistoryListContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const { historyList, historyListError, loading } = useSelector(
    ({ scan, loading }) => ({
      historyList: scan.historyList,
      historyListError: scan.historyListError,
      loading: loading['scan/GET_HISTORY'],
    }),
  );

  return (
    <HistoryListComponent
      navigation={navigation}
      colorScheme={colorScheme}
      historyList={historyList}
      loading={loading}
      historyListError={historyListError}
    />
  );
};

export default HistoryListContainer;
