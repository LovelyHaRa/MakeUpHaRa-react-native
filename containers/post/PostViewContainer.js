import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import PostView from '../../components/post/PostView';
import { useSelector } from 'react-redux';

const PostViewContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.postError,
    loading: loading['post/READ_POST'],
  }));
  return (
    <PostView
      post={post}
      error={error}
      loading={loading}
      colorScheme={colorScheme}
      navigation={navigation}
    />
  );
};

export default PostViewContainer;
