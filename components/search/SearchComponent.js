import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from './StyleContainer';
import CustomStatusBar from '../common/CustomStatusBar';
import { SearchBar, ListItem } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';
import { testWiki, testPost } from './TestData';

const Tab = createMaterialTopTabNavigator();

const SearchComponent = ({ searchQuery, handleQueryChange, colorScheme }) => {
  const WikiListItem = ({ item }) => (
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

  const PostListItem = ({ item }) => (
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
              colorScheme === 'dark' ? styles.darkSubinfo : styles.lightSubinfo
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

  const TotalListItem = ({ item }) => (
    <ListItem
      containerStyle={
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody
      }
      title={item.name || item.title}
      titleStyle={colorScheme === 'dark' ? styles.darkText : styles.lightText}
      subtitle={
        <View>
          <Text
            style={
              colorScheme === 'dark' ? styles.darkSubinfo : styles.lightSubinfo
            }
          >
            {!!item.revision ? '위키문서' : '블로그 포스트'}
          </Text>
          {!item.revision && (
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
          )}
          {!item.revision && (
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
          )}
        </View>
      }
      bottomDivider
      chevron
    />
  );

  const TotalResultSearch = ({ colorScheme }) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={testWiki.concat(testPost)}
          style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
          keyExtractor={(item) => item._id}
          renderItem={TotalListItem}
        />
      </View>
    );
  };

  const WikiResultSearch = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={testWiki}
          style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
          keyExtractor={(item) => item._id}
          renderItem={WikiListItem}
        />
      </View>
    );
  };

  const BlogResultSearch = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={testPost}
          style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
          keyExtractor={(item) => item._id}
          renderItem={PostListItem}
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
