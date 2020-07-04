import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native-appearance';
import PostList from '../../components/post/PostList';
import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../../module/redux/post';

const PostListContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
<<<<<<< HEAD
  const dispatch = useDispatch();
  const { postList, error, loading } = useSelector(({ post, loading }) => ({
    postList: post.postList,
    error: post.postListError,
    loading: loading['post/GET_LIST'],
  }));

  useEffect(() => {
    dispatch(getList({}));
  }, [dispatch]);

  return (
    <PostList
      postList={postList}
      error={error}
      loading={loading}
      navigation={navigation}
      colorScheme={colorScheme}
    />
  );
=======
  return <PostList navigation={navigation} colorScheme={colorScheme} />;
>>>>>>> 7271b9899b89b0151d28cff8855027a3bdeea3ba
};

export default PostListContainer;
