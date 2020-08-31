import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import DocumentViewComponent from '../../components/wiki/DocumentViewComponent';
import { getHistory } from '../../module/redux/scan';

const ResultContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { document, documentError, scanLoading, revisionLoading } = useSelector(
    ({ scan, loading }) => ({
      document: scan.document,
      documentError: scan.documentError,
      scanLoading: loading['scan/GET_DOCUNEMT_BY_BARCODE'],
      revisionLoading: loading['scan/GET_REVISION_DOCUMENT'],
    }),
  );

  const [error, setError] = useState(false);

  const handleHistoryPress = useCallback(
    (title) => {
      dispatch(getHistory({ title }));
      navigation.push('HistoryListComponent');
    },
    [dispatch, navigation],
  );

  const handleBackPress = useCallback(() => navigation.goBack(), [navigation]);

  useEffect(() => {
    setError(false);
    if (document && document.error === true) {
      setError(true);
    }
  }, [document]);

  return (
    <DocumentViewComponent
      getHistory={getHistory}
      historyListComponent="HistoryListComponent"
      colorScheme={colorScheme}
      document={document}
      loading={scanLoading || revisionLoading}
      documentError={documentError}
      error={error}
      handleHistoryPress={handleHistoryPress}
      handleBackPress={handleBackPress}
    />
  );
};

export default ResultContainer;
