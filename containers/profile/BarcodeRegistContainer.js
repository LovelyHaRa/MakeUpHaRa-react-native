import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const page = useRef(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [resultMessage, setResultMessage] = useState({
    state: false,
    success: '',
    failure: '',
  });

  const handleQueryChange = useCallback((query) => {
    setInputQuery(query);
  }, []);

  const handleSubmit = useCallback(() => {
    setQuery(inputQuery);
    setIsEmptyResult(false);
    setListitem([]);
    page.current = 1;
    dispatch(findList({ query: inputQuery, page: 1 }));
    setIsRequest(true);
  }, [dispatch, inputQuery]);

  const handleMoreList = useCallback(() => {
    page.current += 1;
    dispatch(findList({ query, page: page.current }));
  }, [dispatch, query]);

  const handleRefresh = useCallback(() => {
    page.current = 1;
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
      setRefresh(false);
      if (documentList.length === 0) {
        if (page.current === 1) {
          setIsEmptyResult(true);
        }
        setIsLastPage(true);
      } else {
        setIsEmptyResult(false);
        setIsLastPage(false);
      }
      setListitem((listItem) => listItem.concat(documentList));
    }
  }, [documentList, loading, dispatch]);

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
