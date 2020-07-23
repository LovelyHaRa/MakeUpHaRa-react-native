import React from 'react';
import HistoryListComponent from '../../components/wiki/HistoryListComponent';
import { useColorScheme } from 'react-native-appearance';
import { useSelector, useDispatch } from 'react-redux';
import { readDocument } from '../../module/redux/wiki';

const HistoryListContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { historyList, historyListError, loading } = useSelector(
    ({ wiki, loading }) => ({
      historyList: wiki.historyList,
      historyListError: wiki.historyListError,
      loading: loading['wiki/GET_HISTORY'],
    }),
  );

  const handlePress = ({ id, r }) => {
    dispatch(readDocument({ id, r }));
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
