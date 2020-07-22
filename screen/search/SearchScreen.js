import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchContainer from '../../containers/search/SearchContainer';
import PostViewContainer from '../../containers/post/PostViewContainer';

const Stack = createStackNavigator();

const SearchScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Search" component={SearchContainer} />
      <Stack.Screen name="ResultPostView" component={PostViewContainer} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
