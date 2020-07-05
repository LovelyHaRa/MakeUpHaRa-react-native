import React, { useEffect, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native-appearance';
import PostList from '../../components/post/PostList';
import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../../module/redux/post';

const PostListContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { postList, error, loading } = useSelector(({ post, loading }) => ({
    postList: post.postList,
    error: post.postListError,
    loading: loading['post/GET_LIST'],
  }));
  const [listItem, setListitem] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setListitem((listItem) => listItem.concat(postList));
  }, [postList]);

  useEffect(() => {
    const e = navigation.addListener('focus', () => {
      dispatch(getList({ page }));
      setPage((page) => page + 1);
    });
    return e;
  }, [dispatch, navigation, page]);

  useEffect(() => {
    const e = navigation.addListener('blur', () => {
      setPage(1);
      setListitem([]);
    });
    return e;
  }, [navigation]);

  const handleMoreList = useCallback(() => {
    dispatch(getList({ page: page }));
    setPage((page) => page + 1);
  }, [dispatch, page]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setListitem([]);
    dispatch(getList({ page: 1 }));
    setPage((page) => page + 1);
  }, [dispatch, page]);

  return (
    <PostList
      postList={listItem}
      error={error}
      loading={loading}
      handleMoreList={handleMoreList}
      handleRefresh={handleRefresh}
      navigation={navigation}
      colorScheme={colorScheme}
    />
  );
};

export default PostListContainer;
