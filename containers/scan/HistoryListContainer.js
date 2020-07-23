import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import HistoryListComponent from '../../components/wiki/HistoryListComponent';
import { getRevisionDocument } from '../../module/redux/wiki';

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

  const handlePress = ({ id, r }) => {
    dispatch(getRevisionDocument({ id, r }));
  };

  return (
    <HistoryListComponent
      navigation={navigation}
      colorScheme={colorScheme}
      historyList={historyList}
      loading={loading}
      historyListError={historyListError}
      handlePress={handlePress}
    />
  );
};

export default HistoryListContainer;
