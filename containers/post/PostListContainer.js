import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import PostList from '../../components/post/PostList';

const PostListContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  return <PostList navigation={navigation} colorScheme={colorScheme} />;
};

export default PostListContainer;
