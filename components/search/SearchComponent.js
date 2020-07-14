import React from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './StyleContainer';
import CustomStatusBar from '../common/CustomStatusBar';
import { SearchBar } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const SearchComponent = ({ searchQuery, handleQueryChange, colorScheme }) => {
  const TotalResultSearch = ({ colorScheme }) => {
    return (
      <View style={styles.container}>
        <FlatList
          style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar colorScheme={colorScheme} />
      <View style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}>
        <SearchBar
          lightTheme={colorScheme !== 'dark'}
          containerStyle={
            colorScheme === 'dark'
              ? styles.darksearchBarContainer
              : styles.lightsearchBarContainer
          }
          onChangeText={handleQueryChange}
          placeholder="검색어를 입력하세요."
          value={searchQuery}
        />
      </View>
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
        <Tab.Screen name="통합검색" component={TotalResultSearch} />
        <Tab.Screen name="위키" component={TotalResultSearch} />
        <Tab.Screen name="블로그" component={TotalResultSearch} />
      </Tab.Navigator>
    </View>
  );
};

export default SearchComponent;
