import React, { useCallback } from 'react';
import HistoryListComponent from '../../components/wiki/HistoryListComponent';
import { useColorScheme } from 'react-native-appearance';
import { useSelector, useDispatch } from 'react-redux';
import { getRevisionDocument } from '../../module/redux/wiki';

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
