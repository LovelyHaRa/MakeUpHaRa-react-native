import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import PostList from '../../components/post/PostList';

const PostListContainer = () => {
  const colorScheme = useColorScheme();
  return <PostList colorScheme={colorScheme} />;
};

export default PostListContainer;
