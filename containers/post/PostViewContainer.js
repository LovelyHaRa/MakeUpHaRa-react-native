import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import PostView from '../../components/post/PostView';

const PostViewContainer = () => {
  const colorScheme = useColorScheme();
  return <PostView colorScheme={colorScheme} />;
};

export default PostViewContainer;
