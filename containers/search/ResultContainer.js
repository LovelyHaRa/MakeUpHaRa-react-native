import React, { useState, useEffect, useCallback } from 'react';
import {
  TotalResultSearch,
  WikiResultSearch,
  BlogResultSearch,
} from '../../components/search/ResultComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import { getSearchList } from '../../module/redux/post';
import { initializeResultList } from '../../module/redux/search';

export const TotalResultContainer = () => {
  return <TotalResultSearch />;
};

export const WikiResultContainer = () => {
  return <WikiResultSearch />;
};

export const BlogResultContainer = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { searchQuery, postList, error, loading, requestList } = useSelector(
    ({ search, post, loading }) => ({
      searchQuery: search.query,
      postList: post.searchPostList,
      error: post.searchPostListError,
      loading: loading['post/GET_SEARCH_LIST'],
      requestList: search.requestList,
    }),
  );

  const [listItem, setListitem] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleMoreList = useCallback(() => {
    dispatch(getSearchList({ query: searchQuery, page: page }));
    setPage((page) => page + 1);
  }, [dispatch, page]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setRefresh(true);
    dispatch(getSearchList({ query: searchQuery, page: 1 }));
  }, [dispatch, page]);

  useEffect(() => {
    if (page === 1) {
      setListitem([]);
      setPage((page) => page + 1);
    }
    if (refresh) {
      setRefresh(false);
      setListitem([]);
    }
    if (postList.length === 0) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
    setListitem((listItem) => listItem.concat(postList));
  }, [postList]);

  useEffect(() => {
    if (requestList) {
      setListitem([]);
      dispatch(initializeResultList(false));
    }
  }, [dispatch, requestList]);

  return (
    <BlogResultSearch
      postList={listItem}
      error={error}
      loading={loading}
      colorScheme={colorScheme}
      handleMoreList={handleMoreList}
      handleRefresh={handleRefresh}
      refresh={refresh}
      isLastPage={isLastPage}
    />
  );
};
