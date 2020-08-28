import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarcodeRegist from '../../components/profile/BarcodeRegist';
import { initialize, setActionState } from '../../module/redux/search';
import {
  addBarcodeNumber,
  findList,
  initializeSearchList as initWikiSearch,
} from '../../module/redux/wiki';
import { initializeSearchList as initPostSearch } from '../../module/redux/post';
import { useColorScheme } from 'react-native-appearance';

const BarcodeRegistContainer = ({ route }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {
    documentList,
    error,
    loading,
    addBarcodeLoading,
    result,
    resultError,
  } = useSelector(({ wiki, loading }) => ({
    documentList: wiki.findList,
    error: wiki.findListError,
    loading: loading['wiki/FIND_LIST'],
    addBarcodeLoading: loading['wiki/ADD_BARCODE_NUMBER'],
    result: wiki.addBarcodeNumberResult,
    resultError: wiki.addBarcodeNumberResultError,
  }));
  const { code: barcode } = route.params;

  const [inputQuery, setInputQuery] = useState('');
  const [query, setQuery] = useState('');
  const [listItem, setListitem] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [resultMessage, setResultMessage] = useState({
    state: false,
    success: '',
    failure: '',
  });

  const handleQueryChange = (query) => {
    setInputQuery(query);
  };

  const handleSubmit = () => {
    setQuery(inputQuery);
    setIsEmptyResult(false);
    setListitem([]);
    setPage(1);
    dispatch(findList({ query: inputQuery, page: 1 }));
    setIsRequest(true);
  };

  const handleMoreList = useCallback(() => {
    dispatch(findList({ query, page: page }));
    setPage((page) => page + 1);
  }, [dispatch, query, page]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setRefresh(true);
    setListitem([]);
    dispatch(findList({ query, page: 1 }));
  }, [dispatch, query]);

  const handlePress = useCallback(
    (title) => {
      dispatch(addBarcodeNumber({ title, code: barcode }));
    },
    [barcode, dispatch],
  );

  const initResultMessage = useCallback(() => {
    setResultMessage({
      state: false,
      success: '',
      failure: '',
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      if (page === 1) {
        setPage((page) => page + 1);
      }
      if (refresh) {
        setRefresh(false);
        setListitem([]);
      }
      if (documentList.length === 0) {
        if (page === 1 && !loading) {
          setIsEmptyResult(true);
        }
        setIsLastPage(true);
      } else {
        setIsEmptyResult(false);
        setIsLastPage(false);
      }
      setListitem((listItem) => listItem.concat(documentList));
    }
  }, [documentList, loading, refresh, dispatch]);

  useEffect(() => {
    if (result == null && resultError == null) {
      return;
    }
    if (result) {
      if (!result.error) {
        setResultMessage({
          state: true,
          success: '바코드 번호가 등록되었습니다!',
          failure: '',
        });
      } else {
        setResultMessage({
          state: true,
          success: '',
          failure: result.message,
        });
      }
    } else if (resultError) {
      console.log(resultError);
      if (resultError.response && resultError.response.status === 401) {
        setResultMessage({
          state: true,
          success: '',
          failure: '로그인 후 등록할 수 있습니다.',
        });
      } else {
        setResultMessage({
          state: true,
          success: '',
          failure: resultError.message,
        });
      }
    }
  }, [result, resultError]);

  useEffect(() => {
    dispatch(initialize());
    dispatch(initWikiSearch());
    dispatch(initPostSearch());
    dispatch(setActionState(false));
  }, [dispatch]);

  return (
    <BarcodeRegist
      barcode={barcode}
      inputQuery={inputQuery}
      searchQuery={query}
      handleQueryChange={handleQueryChange}
      handleSubmit={handleSubmit}
      colorScheme={colorScheme}
      documentList={listItem}
      error={error}
      loading={loading}
      handleMoreList={handleMoreList}
      handleRefresh={handleRefresh}
      refresh={refresh}
      isLastPage={isLastPage}
      emptyResult={isEmptyResult}
      isRequest={isRequest}
      addBarcodeLoading={addBarcodeLoading}
      handlePress={handlePress}
      resultMessage={resultMessage}
      initResultMessage={initResultMessage}
    />
  );
};

export default BarcodeRegistContainer;
