import React from 'react';
import SearchComponent from '../../components/search/SearchComponent';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const SearchScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Search" component={SearchComponent} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
