import React, { useEffect, useState } from 'react';
import ResultComponent from '../../components/scan/ResultComponent';
import { useDispatch, useSelector } from 'react-redux';

const ResultContainer = ({ navigation }) => {
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
      document={document}
      loading={loading}
      documentError={documentError}
      error={error}
    />
  );
};

export default ResultContainer;
