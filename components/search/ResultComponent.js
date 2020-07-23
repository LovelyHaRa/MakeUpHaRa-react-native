import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { styles } from './StyleContainer';
import moment from 'moment';
import LoadingComponent from '../common/LoadingComponent';
import { useDispatch } from 'react-redux';
import { readPost } from '../../module/redux/post';
import { readDocument } from '../../module/redux/wiki';

export const TotalResultSearch = ({
  totalList,
  error,
  loading,
  handleMoreList,
  handleRefresh,
  refresh,
  colorScheme,
  isLastPage,
  navigation,
}) => {
  const dispatch = useDispatch();
  const TotalListItem = ({ item }) => {
    const type = !!item.lately ? 'wiki' : 'post';
    const handleWikiItemPress = () => {
      dispatch(readDocument({ id: item.name }));
      navigation.push('ResultWikiView');
    };
    const handlePostItemPress = () => {
      dispatch(readPost({ id: item._id }));
      navigation.push('ResultPostView');
    };
    return (
      <ListItem
        containerStyle={
          colorScheme === 'dark' ? styles.darkBody : styles.lightBody
        }
        title={item.name || item.title}
        titleStyle={colorScheme === 'dark' ? styles.darkText : styles.lightText}
        onPress={type === 'wiki' ? handleWikiItemPress : handlePostItemPress}
        subtitle={
          <View>
            <Text
              style={
                colorScheme === 'dark'
                  ? styles.darkSubinfo
                  : styles.lightSubinfo
              }
            >
              {type === 'wiki' ? '위키문서' : '블로그 포스트'}
            </Text>
            {type === 'post' ? (
              <Text
                style={
                  colorScheme === 'dark'
                    ? styles.darkSubinfo
                    : styles.lightSubinfo
                }
              >
                {item.publisher.username}
                {'  \u00B7  '}
                {moment(item.publishedDate).format('YYYY-MM-DD')}
              </Text>
            ) : (
              <View></View>
            )}
            {type === 'post' ? (
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
            ) : (
              <View></View>
            )}
          </View>
        }
        bottomDivider
        chevron
      />
    );
  };
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
        data={totalList}
        style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
        keyExtractor={(item) => item._id}
        renderItem={TotalListItem}
        onEndReached={() => {
          handleMoreList();
        }}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={!!refresh.wiki || !!refresh.post}
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
          totalList.length > 0 && !isLastPage ? (
            <LoadingComponent colorScheme={colorScheme} hasMarginTop />
          ) : null
        }
      />
    </View>
  );
};

export const WikiResultSearch = ({
  documentList,
  error,
  loading,
  handleMoreList,
  handleRefresh,
  refresh,
  isLastPage,
  colorScheme,
  navigation,
}) => {
  const dispatch = useDispatch();
  const WikiListItem = ({ item }) => (
    <ListItem
      containerStyle={
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody
      }
      onPress={() => {
        dispatch(readDocument({ id: item.name }));
        navigation.push('ResultWikiView');
      }}
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
        data={documentList}
        style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
        keyExtractor={(item) => item._id}
        renderItem={WikiListItem}
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
          documentList.length > 0 && !isLastPage ? (
            <LoadingComponent colorScheme={colorScheme} hasMarginTop />
          ) : null
        }
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
  navigation,
}) => {
  const dispatch = useDispatch();
  const PostListItem = ({ item }) => (
    <ListItem
      containerStyle={
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody
      }
      onPress={() => {
        dispatch(readPost({ id: item._id }));
        navigation.push('ResultPostView');
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
