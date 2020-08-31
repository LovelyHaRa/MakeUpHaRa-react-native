import React, { useCallback, useEffect, useState } from 'react';
import DocumentViewComponent from '../../components/wiki/DocumentViewComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import { getHistory } from '../../module/redux/wiki';

const DocumentViewContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { document, documentError, loading } = useSelector(
    ({ wiki, loading }) => ({
      document: wiki.document,
      documentError: wiki.documentError,
      loading: loading['wiki/READ_DOCUMENT'],
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
      historyListComponent="ResultHistoryView"
      colorScheme={colorScheme}
      document={document}
      loading={loading}
      documentError={documentError}
      error={error}
      handleHistoryPress={handleHistoryPress}
      handleBackPress={handleBackPress}
    />
  );
};

export default DocumentViewContainer;
