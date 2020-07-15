import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from './StyleContainer';
import CustomStatusBar from '../common/CustomStatusBar';
import { SearchBar, ListItem } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';

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

  const WikiResultSearch = () => {
    const testWiki = [
      { _id: '1', name: 'result1' },
      { _id: '2', name: 'result2' },
      { _id: '3', name: 'result3' },
      { _id: '4', name: 'result4' },
      { _id: '5', name: 'result5' },
      { _id: '6', name: 'result6' },
      { _id: '7', name: 'result7' },
      { _id: '8', name: 'result8' },
      { _id: '9', name: 'result9' },
      { _id: '10', name: 'result10' },
    ];
    const renderItem = ({ item }) => (
      <ListItem
        containerStyle={
          colorScheme === 'dark' ? styles.darkBody : styles.lightBody
        }
        title={item.name}
        titleStyle={colorScheme === 'dark' ? styles.darkText : styles.lightText}
        bottomDivider
        chevron
      />
    );
    return (
      <View style={styles.container}>
        <FlatList
          data={testWiki}
          style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const BlogResultSearch = () => {
    const testPost = [
      {
        _id: 'p1',
        title: 'PostResult1',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag', 'testTag2'],
      },
      {
        _id: 'p2',
        title: 'PostResult2',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag'],
      },
      {
        _id: 'p3',
        title: 'PostResult3',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag'],
      },
      {
        _id: 'p4',
        title: 'PostResult4',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag'],
      },
      {
        _id: 'p5',
        title: 'PostResult5',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag'],
      },
      {
        _id: 'p6',
        title: 'PostResult6',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag'],
      },
      {
        _id: 'p7',
        title: 'PostResult7',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag'],
      },
      {
        _id: 'p8',
        title: 'PostResult8',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag'],
      },
      {
        _id: 'p9',
        title: 'PostResult9',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag'],
      },
      {
        _id: 'p10',
        title: 'PostResult10',
        publisher: 'test01',
        publishedDate: moment(),
        tags: ['testTag'],
      },
    ];
    const renderItem = ({ item }) => (
      <ListItem
        containerStyle={
          colorScheme === 'dark' ? styles.darkBody : styles.lightBody
        }
        title={item.title}
        titleStyle={colorScheme === 'dark' ? styles.darkText : styles.lightText}
        subtitle={
          <View>
            <Text
              style={
                colorScheme === 'dark'
                  ? styles.darkSubinfo
                  : styles.lightSubinfo
              }
            >
              {item.publisher}
              {'  \u00B7  '}
              {moment(item.publishedDate).format('YYYY-MM-DD')}
            </Text>
            <View style={styles.tagContainer}>
              {item.tags.map((tag) => (
                <Text
                  key={`${item._id}${tag}`}
                  style={[
                    { ...styles.tag },
                    colorScheme === 'dark'
                      ? { ...styles.darkThemeColor }
                      : { ...styles.lightThemeColor },
                  ]}
                >
                  #{tag}
                </Text>
              ))}
            </View>
          </View>
        }
        bottomDivider
        chevron
      />
    );
    return (
      <View style={styles.container}>
        <FlatList
          data={testPost}
          style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
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
        <Tab.Screen name="위키" component={WikiResultSearch} />
        <Tab.Screen name="블로그" component={BlogResultSearch} />
      </Tab.Navigator>
    </View>
  );
};

export default SearchComponent;
