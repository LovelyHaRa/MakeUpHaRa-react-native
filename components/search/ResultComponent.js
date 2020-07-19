import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { styles } from './StyleContainer';
import { Appearance } from 'react-native-appearance';
import { testWiki, testPost } from './TestData';
import moment from 'moment';
import LoadingComponent from '../common/LoadingComponent';

const colorScheme = Appearance.getColorScheme();

export const TotalResultSearch = () => {
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
  return (
    <View
      style={[
        { ...styles.container },
        colorScheme === 'dark'
          ? { ...styles.darkBody }
          : { ...styles.lightBody },
      ]}
    >
      <FlatList
        data={testWiki}
        style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
        keyExtractor={(item) => item._id}
        renderItem={TotalListItem}
      />
    </View>
  );
};

export const WikiResultSearch = () => {
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
  return (
    <View
      style={[
        { ...styles.container },
        colorScheme === 'dark'
          ? { ...styles.darkBody }
          : { ...styles.lightBody },
      ]}
    >
      <FlatList
        data={testWiki}
        style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
        keyExtractor={(item) => item._id}
        renderItem={WikiListItem}
      />
    </View>
  );
};

export const BlogResultSearch = ({
  postList,
  error,
  loading,
  handleMoreList,
  handleRefresh,
  refresh,
  isLastPage,
  colorScheme,
}) => {
  const PostListItem = ({ item }) => (
    <ListItem
      containerStyle={
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody
      }
      onPress={() => {
        /* dispatch */
      }}
      title={item.title}
      titleStyle={colorScheme === 'dark' ? styles.darkText : styles.lightText}
      subtitle={
        <View>
          <Text
            style={
              colorScheme === 'dark' ? styles.darkSubinfo : styles.lightSubinfo
            }
          >
            {item.publisher.username}
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
    <View
      style={[
        { ...styles.container },
        colorScheme === 'dark'
          ? { ...styles.darkBody }
          : { ...styles.lightBody },
      ]}
    >
      <FlatList
        data={postList}
        style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
        keyExtractor={(item) => item._id}
        renderItem={PostListItem}
        onEndReached={() => {
          handleMoreList();
        }}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={!!refresh}
            onRefresh={() => {
              handleRefresh();
            }}
            progressBackgroundColor={
              colorScheme === 'dark'
                ? styles.darkLoading.color
                : styles.lightLoading.color
            }
          />
        }
        ListFooterComponent={
          postList.length > 0 && !isLastPage ? (
            <LoadingComponent colorScheme={colorScheme} hasMarginTop />
          ) : null
        }
      />
    </View>
  );
};
