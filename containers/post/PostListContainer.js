import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useColorScheme } from 'react-native-appearance';
import PostList from '../../components/post/PostList';
import { useSelector, useDispatch } from 'react-redux';
import { getList, readPost } from '../../module/redux/post';

const PostListContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { postList, error, loading } = useSelector(({ post, loading }) => ({
    postList: post.postList,
    error: post.postListError,
    loading: loading['post/GET_LIST'],
  }));

  const [listItem, setListitem] = useState([]);
  const page = useRef(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const firstLoading = useRef(false);

  useEffect(() => {
    if (firstLoading.current) {
      setListitem([]);
      firstLoading.current = false;
    }
    setRefresh(false);
    if (postList.length === 0) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
    setListitem((listItem) => listItem.concat(postList));
  }, [postList, error]);

  useEffect(() => {
    const e = navigation.addListener('focus', () => {
      firstLoading.current = true;
      dispatch(getList({ page: 1 }));
    });
    return e;
  }, [dispatch, navigation, page]);

  useEffect(() => {
    const e = navigation.addListener('blur', () => {
      page.current = 1;
      setListitem([]);
    });
    return e;
  }, [navigation]);

  const handleMoreList = useCallback(() => {
    page.current += 1;
    dispatch(getList({ page: page.current }));
  }, [dispatch, page]);

  const handleRefresh = useCallback(() => {
    page.current = 1;
    setRefresh(true);
    setListitem([]);
    dispatch(getList({ page: 1 }));
  }, [dispatch, page]);

  const handleItemPress = useCallback(
    (id) => {
      dispatch(readPost({ id }));
      navigation.push('PostView');
    },
    [dispatch, navigation],
  );

  return (
    <PostList
      postList={listItem}
      error={error}
      loading={!!firstLoading.current}
      handleMoreList={handleMoreList}
      handleRefresh={handleRefresh}
      handleItemPress={handleItemPress}
      refresh={refresh}
      isLastPage={isLastPage}
      colorScheme={colorScheme}
    />
  );
};

export default PostListContainer;
