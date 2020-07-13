import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostListContainer from '../../containers/post/PostListContainer';
import PostViewContainer from '../../containers/post/PostViewContainer';
import { useColorScheme } from 'react-native-appearance';
import palette from '../../lib/styles/open-color';

const Stack = createStackNavigator();

const BlogScreen = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator headerMode="none" mode="card">
      <Stack.Screen name="PostList" component={PostListContainer} />
      <Stack.Screen name="PostView" component={PostViewContainer} />
    </Stack.Navigator>
  );
};

export default BlogScreen;
