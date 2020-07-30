import React, { useState, useEffect, useCallback } from 'react';
import {
  TotalResultSearch,
  WikiResultSearch,
  BlogResultSearch,
} from '../../components/search/ResultComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import { getSearchList as getPostSearchList } from '../../module/redux/post';
import { getSearchList as getWikiSearchList } from '../../module/redux/wiki';
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
    isEmptyResult: search.isEmptyResult,
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
          dispatch(setIsEmptyResult(true));
        }
        setIsLastPage(true);
      } else {
        dispatch(setIsEmptyResult(false));
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
    isEmptyResult: search.isEmptyResult,
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
          dispatch(setIsEmptyResult(true));
        }
        setIsLastPage(true);
      } else {
        dispatch(setIsEmptyResult(false));
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
      navigation={navigation}
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
    isEmptyResult: search.isEmptyResult,
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
          dispatch(setIsEmptyResult(true));
        }
        setIsLastPage(true);
      } else {
        dispatch(setIsEmptyResult(false));
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
      navigation={navigation}
    />
  );
};
