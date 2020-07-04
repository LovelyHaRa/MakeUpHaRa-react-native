import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostListContainer from '../../containers/post/PostListContainer';
import PostViewContainer from '../../containers/post/PostViewContainer';

const Stack = createStackNavigator();

const BlogScreen = () => {
  return (
    <Stack.Navigator headerMode="none" mode="card">
      <Stack.Screen name="PostList" component={PostListContainer} />
      <Stack.Screen name="PostView" component={PostViewContainer} />
    </Stack.Navigator>
  );
};

export default BlogScreen;
