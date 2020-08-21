import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { styles } from './StyleContainer';
import moment from 'moment';
import LoadingComponent from '../common/LoadingComponent';
import DismissKeyboard from '../common/DismissKeyboard';

export const TotalResultSearch = ({
  totalList,
  searchQuery,
  error,
  loading,
  handleMoreList,
  handleRefresh,
  refresh,
  colorScheme,
  isLastPage,
  emptyResult,
  handleItemPress,
}) => {
  const TotalListItem = ({ item }) => {
    const type = !!item.lately ? 'wiki' : 'post';
    return (
      <ListItem
        containerStyle={
          colorScheme === 'dark' ? styles.darkBody : styles.lightBody
        }
        title={item.name || item.title}
        titleStyle={colorScheme === 'dark' ? styles.darkText : styles.lightText}
        onPress={() => {
          const id = type === 'wiki' ? item.name : item._id;
          handleItemPress({ type, id });
        }}
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
    <DismissKeyboard>
      <View
        style={[
          { ...styles.container },
          colorScheme === 'dark'
            ? { ...styles.darkBody }
            : { ...styles.lightBody },
        ]}
      >
        {emptyResult ? (
          <EmptyResultComponent colorScheme={colorScheme} query={searchQuery} />
        ) : (
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
        )}
      </View>
    </DismissKeyboard>
  );
};

export const WikiResultSearch = ({
  documentList,
  searchQuery,
  error,
  loading,
  handleMoreList,
  handleRefresh,
  refresh,
  isLastPage,
  emptyResult,
  colorScheme,
  handleItemPress,
}) => {
  const WikiListItem = ({ item }) => (
    <ListItem
      containerStyle={
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody
      }
      onPress={() => {
        handleItemPress(item.name);
      }}
      title={item.name}
      titleStyle={colorScheme === 'dark' ? styles.darkText : styles.lightText}
      bottomDivider
      chevron
    />
  );
  return (
    <DismissKeyboard>
      <View
        style={[
          { ...styles.container },
          colorScheme === 'dark'
            ? { ...styles.darkBody }
            : { ...styles.lightBody },
        ]}
      >
        {emptyResult ? (
          <EmptyResultComponent colorScheme={colorScheme} query={searchQuery} />
        ) : (
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
        )}
      </View>
    </DismissKeyboard>
  );
};

export const BlogResultSearch = ({
  postList,
  searchQuery,
  error,
  loading,
  handleMoreList,
  handleRefresh,
  refresh,
  isLastPage,
  emptyResult,
  colorScheme,
  handleItemPress,
}) => {
  const PostListItem = ({ item }) => (
    <ListItem
      containerStyle={
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody
      }
      onPress={() => {
        handleItemPress(item._id);
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
    <DismissKeyboard>
      <View
        style={[
          { ...styles.container },
          colorScheme === 'dark'
            ? { ...styles.darkBody }
            : { ...styles.lightBody },
        ]}
      >
        {emptyResult ? (
          <EmptyResultComponent colorScheme={colorScheme} query={searchQuery} />
        ) : (
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
        )}
      </View>
    </DismissKeyboard>
  );
};

const EmptyResultComponent = ({ colorScheme, query }) => (
  <View
    style={[
      styles.container,
      styles.resultInfoBody,
      colorScheme === 'dark' ? { ...styles.darkBody } : { ...styles.lightBody },
    ]}
  >
    <Text
      style={[
        styles.resultInfoTitle,
        colorScheme === 'dark'
          ? { ...styles.darkText }
          : { ...styles.lightText },
      ]}
    >
      <Text
        style={
          colorScheme === 'dark'
            ? styles.darkThemeColor
            : styles.lightThemeColor
        }
      >
        '{query}'
      </Text>
      에 대한 검색결과가 없습니다.
    </Text>
    <Text
      style={[
        styles.resultInfoSubTitle,
        colorScheme === 'dark'
          ? { ...styles.darkText, ...styles.darkSubinfo }
          : { ...styles.lightText, ...styles.lightSubinfo },
      ]}
    >
      검색어에 오탈자가 있는지 확인해보세요.
    </Text>
    <Text
      style={[
        styles.resultInfoSubTitle,
        colorScheme === 'dark'
          ? { ...styles.darkText, ...styles.darkSubinfo }
          : { ...styles.lightText, ...styles.lightSubinfo },
      ]}
    >
      띄어쓰기가 올바른지 확인해보세요.
    </Text>
    <Text
      style={[
        styles.resultInfoSubTitle,
        colorScheme === 'dark'
          ? { ...styles.darkText, ...styles.darkSubinfo }
          : { ...styles.lightText, ...styles.lightSubinfo },
      ]}
    >
      아니면 다른 검색어를 입력해 보는건 어떨까요???
    </Text>
  </View>
);
