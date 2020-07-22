import React, { useEffect, useState } from 'react';
import DocumentViewComponent from '../../components/wiki/DocumentViewComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import { unloadDocument } from '../../module/redux/wiki';

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

  useEffect(() => {
    setError(false);
    if (document && document.error === true) {
      setError(true);
    }
  }, [document]);

  return (
    <DocumentViewComponent
      navigation={navigation}
      historyListComponent="ResultHistoryView"
      colorScheme={colorScheme}
      document={document}
      loading={loading}
      documentError={documentError}
      error={error}
    />
  );
};

export default DocumentViewContainer;
