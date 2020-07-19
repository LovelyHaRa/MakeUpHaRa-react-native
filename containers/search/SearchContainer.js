import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import SearchComponent from '../../components/search/SearchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, initializeResultList } from '../../module/redux/search';
import { getSearchList as getPostSearchList } from '../../module/redux/post';
import { getSearchList as getWikiSearchList } from '../../module/redux/wiki';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { styles } from '../../components/search/StyleContainer';
import {
  BlogResultContainer,
  TotalResultContainer,
  WikiResultContainer,
} from './ResultContainer';

const Tab = createMaterialTopTabNavigator();

const SearchContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(({ search, post, loading }) => ({
    searchQuery: search.query,
  }));

  const handleQueryChange = (search) => {
    dispatch(changeInput(search));
  };
  const handleSubmit = () => {
    dispatch(initializeResultList(true));
    dispatch(getWikiSearchList({ query: searchQuery }));
    dispatch(getPostSearchList({ query: searchQuery }));
  };

  return (
    <View style={styles.container}>
      <SearchComponent
        colorScheme={colorScheme}
        searchQuery={searchQuery}
        handleQueryChange={handleQueryChange}
        handleSubmit={handleSubmit}
      />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor:
            colorScheme === 'dark'
              ? styles.darkText.color
              : styles.lightText.color,
          indicatorStyle:
            colorScheme === 'dark'
              ? styles.darkThemeBackgroundColor
              : styles.lightThemeBackgroundColor,
          style: colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
        }}
      >
        <Tab.Screen name="통합검색" component={TotalResultContainer} />
        <Tab.Screen name="위키" component={WikiResultContainer} />
        <Tab.Screen name="블로그" component={BlogResultContainer} />
      </Tab.Navigator>
    </View>
  );
};

export default SearchContainer;
