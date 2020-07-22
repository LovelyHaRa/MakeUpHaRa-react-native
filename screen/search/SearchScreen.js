import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchContainer from '../../containers/search/SearchContainer';
import PostViewContainer from '../../containers/post/PostViewContainer';
import DocumentViewContainer from '../../containers/wiki/DocumentViewContainer';
import HistoryListContainer from '../../containers/wiki/HistoryListContainer';

const Stack = createStackNavigator();

const SearchScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Search" component={SearchContainer} />
      <Stack.Screen name="ResultPostView" component={PostViewContainer} />
      <Stack.Screen name="ResultWikiView" component={DocumentViewContainer} />
      <Stack.Screen name="ResultHistoryView" component={HistoryListContainer} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
