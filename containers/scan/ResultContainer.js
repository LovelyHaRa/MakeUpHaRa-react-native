import React, { useEffect, useState } from 'react';
import ResultComponent from '../../components/scan/ResultComponent';
import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';

const ResultContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const { document, documentError, loading } = useSelector(
    ({ scan, loading }) => ({
      document: scan.document,
      documentError: scan.documentError,
      loading: loading['scan/GET_DOCUNEMT_BY_BARCODE'],
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
    <ResultComponent
      navigation={navigation}
      colorScheme={colorScheme}
      document={document}
      loading={loading}
      documentError={documentError}
      error={error}
    />
  );
};

export default ResultContainer;
