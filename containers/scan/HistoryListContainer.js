import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import HistoryListComponent from '../../components/wiki/HistoryListComponent';
import { getRevisionDocument } from '../../module/redux/scan';

const HistoryListContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { historyList, historyListError, loading } = useSelector(
    ({ scan, loading }) => ({
      historyList: scan.historyList,
      historyListError: scan.historyListError,
      loading: loading['scan/GET_HISTORY'],
    }),
  );

  const handlePress = useCallback(
    ({ title, r }) => {
      dispatch(getRevisionDocument({ title, r }));
      navigation.goBack();
    },
    [dispatch, navigation],
  );

  const handleBackPress = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <HistoryListComponent
      colorScheme={colorScheme}
      historyList={historyList}
      loading={loading}
      historyListError={historyListError}
      handlePress={handlePress}
      handleBackPress={handleBackPress}
    />
  );
};

export default HistoryListContainer;
