import React, { useEffect, useState } from 'react';
import ResultComponent from '../../components/scan/ResultComponent';
import { useDispatch, useSelector } from 'react-redux';

const ResultContainer = () => {
  const { resultScan, resultScanError, loading } = useSelector(
    ({ scan, loading }) => ({
      resultScan: scan.resultScan,
      resultScanError: scan.resultScanError,
      loading: loading['scan/GET_TITLE_BY_BARCODE'],
    }),
  );

  const [uri, setUri] = useState('http://39.113.253.217:4000');

  useEffect(() => {
    if (resultScan) {
      const { name } = resultScan.title;
      setUri(`http://39.113.253.217:4000/w/${name}`);
    }
  }, [resultScan]);

  return <ResultComponent uri={uri} />;
};

export default ResultContainer;
