import React, { useState, useEffect, useCallback } from 'react';
import {
  TotalResultSearch,
  WikiResultSearch,
  BlogResultSearch,
} from '../../components/search/ResultComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import {
  getSearchList as getPostSearchList,
  readPost,
} from '../../module/redux/post';
import {
  getSearchList as getWikiSearchList,
  readDocument,
} from '../../module/redux/wiki';
import {
  initializeResultList,
  getTotalList,
  setIsEmptyResult,
} from '../../module/redux/search';

export const TotalResultContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {
    searchQuery,
    isEmptyResult,
    totalList,
    error,
    loading,
    requestList,
  } = useSelector(({ search, loading }) => ({
    searchQuery: search.query,
    isEmptyResult: search.isEmptyResult['total'],
    totalList: search.totalList,
    error: search.totalListError,
    loading: loading['search/GET_TOTAL_LIST'],
    requestList: search.requestList,
  }));

  const [listItem, setListitem] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleMoreList = useCallback(() => {
    dispatch(getTotalList({ query: searchQuery, page: page }));
    setPage((page) => page + 1);
  }, [dispatch, page]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setRefresh(true);
    setListitem([]);
    dispatch(getTotalList({ query: searchQuery, page: 1 }));
  }, [dispatch]);

  const handleItemPress = ({ type, id }) => {
    if (type === 'wiki') {
      dispatch(readDocument({ id }));
      navigation.push('ResultWikiView');
    } else {
      dispatch(readPost({ id }));
      navigation.push('ResultPostView');
    }
  };

  useEffect(() => {
    if (!loading) {
      if (page === 1) {
        setPage((page) => page + 1);
      }
      if (refresh) {
        setRefresh(false);
        setListitem([]);
      }
      if (totalList.length === 0) {
        if (page === 1) {
          dispatch(setIsEmptyResult({ key: 'total', value: true }));
        }
        setIsLastPage(true);
      } else {
        dispatch(setIsEmptyResult({ key: 'total', value: false }));
        setIsLastPage(false);
      }
      setListitem((listItem) => listItem.concat(totalList));
    }
  }, [totalList, loading, dispatch]);

  useEffect(() => {
    if (requestList) {
      setListitem([]);
      setPage(1);
      dispatch(initializeResultList(false));
    }
  }, [dispatch, requestList]);

  return (
    <TotalResultSearch
      totalList={listItem}
      searchQuery={searchQuery}
      error={error}
      loading={loading}
      colorScheme={colorScheme}
      handleMoreList={handleMoreList}
      handleRefresh={handleRefresh}
      refresh={refresh}
      isLastPage={isLastPage}
      emptyResult={isEmptyResult}
      navigation={navigation}
      handleItemPress={handleItemPress}
    />
  );
};

export const WikiResultContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {
    searchQuery,
    isEmptyResult,
    documentList,
    error,
    loading,
    requestList,
  } = useSelector(({ search, wiki, loading }) => ({
    searchQuery: search.query,
    isEmptyResult: search.isEmptyResult['wiki'],
    documentList: wiki.searchList,
    error: wiki.searchListError,
    loading: loading['wiki/GET_SEARCH_LIST'],
    requestList: search.requestList,
  }));

  const [listItem, setListitem] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleMoreList = useCallback(() => {
    dispatch(getWikiSearchList({ query: searchQuery, page: page }));
    setPage((page) => page + 1);
  }, [dispatch, page]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setRefresh(true);
    setListitem([]);
    dispatch(getWikiSearchList({ query: searchQuery, page: 1 }));
  }, [dispatch]);

  const handleItemPress = (id) => {
    dispatch(readDocument({ id }));
    navigation.push('ResultWikiView');
  };

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
          dispatch(setIsEmptyResult({ key: 'wiki', value: true }));
        }
        setIsLastPage(true);
      } else {
        dispatch(setIsEmptyResult({ key: 'wiki', value: false }));
        setIsLastPage(false);
      }
      setListitem((listItem) => listItem.concat(documentList));
    }
  }, [documentList, loading, dispatch]);

  useEffect(() => {
    if (requestList) {
      setListitem([]);
      setPage(1);
      dispatch(initializeResultList(false));
    }
  }, [dispatch, requestList]);

  return (
    <WikiResultSearch
      documentList={listItem}
      searchQuery={searchQuery}
      error={error}
      loading={loading}
      colorScheme={colorScheme}
      handleMoreList={handleMoreList}
      handleRefresh={handleRefresh}
      refresh={refresh}
      isLastPage={isLastPage}
      emptyResult={isEmptyResult}
      handleItemPress={handleItemPress}
    />
  );
};

export const BlogResultContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {
    searchQuery,
    isEmptyResult,
    postList,
    error,
    loading,
    requestList,
  } = useSelector(({ search, post, loading }) => ({
    searchQuery: search.query,
    isEmptyResult: search.isEmptyResult['blog'],
    postList: post.searchPostList,
    error: post.searchPostListError,
    loading: loading['post/GET_SEARCH_LIST'],
    requestList: search.requestList,
  }));

  const [listItem, setListitem] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleMoreList = useCallback(() => {
    dispatch(getPostSearchList({ query: searchQuery, page: page }));
    setPage((page) => page + 1);
  }, [dispatch, page]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setRefresh(true);
    setListitem([]);
    dispatch(getPostSearchList({ query: searchQuery, page: 1 }));
  }, [dispatch]);

  const handleItemPress = (id) => {
    dispatch(readPost({ id }));
    navigation.push('ResultPostView');
  };

  useEffect(() => {
    if (!loading) {
      if (page === 1) {
        setPage((page) => page + 1);
      }
      if (refresh) {
        setRefresh(false);
        setListitem([]);
      }
      if (postList.length === 0) {
        if (page === 1 && !loading) {
          dispatch(setIsEmptyResult({ key: 'blog', value: true }));
        }
        setIsLastPage(true);
      } else {
        dispatch(setIsEmptyResult({ key: 'blog', value: false }));
        setIsLastPage(false);
      }
      setListitem((listItem) => listItem.concat(postList));
    }
  }, [postList, loading, dispatch]);

  useEffect(() => {
    if (requestList) {
      setListitem([]);
      setPage(1);
      dispatch(initializeResultList(false));
    }
  }, [dispatch, requestList]);

  return (
    <BlogResultSearch
      postList={listItem}
      searchQuery={searchQuery}
      error={error}
      loading={loading}
      colorScheme={colorScheme}
      handleMoreList={handleMoreList}
      handleRefresh={handleRefresh}
      refresh={refresh}
      isLastPage={isLastPage}
      emptyResult={isEmptyResult}
      handleItemPress={handleItemPress}
    />
  );
};
