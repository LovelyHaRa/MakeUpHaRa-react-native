import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchContainer from '../../containers/search/SearchContainer';

const Stack = createStackNavigator();

const SearchScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Search" component={SearchContainer} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
