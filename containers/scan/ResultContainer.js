import React, { useEffect, useState } from 'react';
import ResultComponent from '../../components/scan/ResultComponent';
import { useDispatch, useSelector } from 'react-redux';

const ResultContainer = ({ navigation }) => {
  const { document, documentError, loading } = useSelector(
    ({ scan, loading }) => ({
      document: scan.document,
      document: scan.document,
      loading: loading['scan/GET_DOCUNEMT_BY_BARCODE'],
    }),
  );

  const [uri, setUri] = useState('http://39.113.253.217:4000');

  useEffect(() => {
    if (document) {
      const { name } = document.title;
      setUri(`http://39.113.253.217:4000/w/${name}`);
    }
  }, [document]);

  return (
    <ResultComponent
      navigation={navigation}
      document={document}
      loading={loading}
    />
  );
};

export default ResultContainer;
