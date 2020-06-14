import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HistoryListComponent from '../../components/scan/HistoryListComponent';

const HistoryListContainer = ({ navigation }) => {
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
      historyList={historyList}
      loading={loading}
      historyListError={historyListError}
    />
  );
};

export default HistoryListContainer;
