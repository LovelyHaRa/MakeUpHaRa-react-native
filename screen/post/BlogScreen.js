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
    <Stack.Navigator mode="card">
      <Stack.Screen
        name="PostList"
        component={PostListContainer}
        options={{
          headerTitle: 'BLOG',
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark' ? palette.gray[9] : palette.gray[0],
          },
          headerTitleStyle: {
            color: colorScheme === 'dark' ? palette.gray[0] : palette.gray[9],
          },
        }}
      />
      <Stack.Screen
        name="PostView"
        component={PostViewContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BlogScreen;
