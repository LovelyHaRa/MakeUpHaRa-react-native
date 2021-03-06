import React, { useCallback } from 'react';
import { useColorScheme } from 'react-native-appearance';
import SearchComponent from '../../components/search/SearchComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeInput,
  initializeResultList,
  getTotalList,
  setQuery,
  initializeIsEmptyResult,
  setActionState,
} from '../../module/redux/search';
import { getSearchList as getPostSearchList } from '../../module/redux/post';
import { getSearchList as getWikiSearchList } from '../../module/redux/wiki';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from '../../components/search/StyleContainer';
import {
  BlogResultContainer,
  TotalResultContainer,
  WikiResultContainer,
} from './ResultContainer';
import InfoComponent from '../../components/search/InfoComponent';
import ResponsiveView from '../../components/common/ResponsiveView';

const Tab = createMaterialTopTabNavigator();

const SearchContainer = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { inputQuery, actionState } = useSelector(({ search }) => ({
    inputQuery: search.inputQuery,
    actionState: search.actionState,
  }));

  const handleQueryChange = useCallback(
    (search) => {
      dispatch(changeInput(search));
    },
    [dispatch],
  );

  const handleSubmit = useCallback(() => {
    dispatch(setActionState(true));
    dispatch(initializeIsEmptyResult());
    dispatch(setQuery(inputQuery));
    dispatch(initializeResultList(true));
    dispatch(getTotalList({ query: inputQuery }));
    dispatch(getWikiSearchList({ query: inputQuery }));
    dispatch(getPostSearchList({ query: inputQuery }));
  }, [dispatch, inputQuery]);

  return (
    <ResponsiveView
      containerStyle={[styles.container]}
      colorScheme={colorScheme}
    >
      <SearchComponent
        colorScheme={colorScheme}
        inputQuery={inputQuery}
        handleQueryChange={handleQueryChange}
        handleSubmit={handleSubmit}
      />
      {!actionState ? (
        <InfoComponent colorScheme={colorScheme} />
      ) : (
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
      )}
    </ResponsiveView>
  );
};

export default SearchContainer;
