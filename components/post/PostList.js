import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { styles } from './StyleContainer';
import CustomStatusBar from '../common/CustomStatusBar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { readPost } from '../../module/redux/post';
import palette from '../../lib/styles/open-color';
import LoadingComponent from '../common/LoadingComponent';

const PostList = ({
  postList,
  error,
  loading,
  handleMoreList,
  handleRefresh,
  refresh,
  isLastPage,
  navigation,
  colorScheme,
}) => {
  if (error) {
    return (
      <View style={styles.container}>
        <Text>잘못된 접근입니다.</Text>
      </View>
    );
  }
  const dispatch = useDispatch();
  const PostItem = ({ id, title, publisher, publishedDate, tags, body }) => (
    <View
      style={[
        { ...styles.listItemBorder },
        colorScheme === 'dark'
          ? { ...styles.darkListItemBorder }
          : { ...styles.lightListItemBorder },
      ]}
    >
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          dispatch(readPost({ id }));
          navigation.push('PostView');
        }}
      >
        <Text
          style={[
            { ...styles.itemTitle },
            colorScheme === 'dark' ? styles.darkText : styles.lightText,
          ]}
        >
          {title}
        </Text>
        <TouchableOpacity>
          <Text
            style={[
              { ...styles.itemPublisher },
              colorScheme === 'dark' ? styles.darkSubinfo : styles.lightSubinfo,
            ]}
          >
            {publisher.username}
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            { ...styles.itemPublishDate },
            colorScheme === 'dark' ? styles.darkSubinfo : styles.lightSubinfo,
          ]}
        >
          {moment(publishedDate).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
        <View style={styles.tagContainer}>
          {tags.map((tag) => (
            <TouchableOpacity key={tag}>
              <Text
                style={[
                  { ...styles.itemTag },
                  colorScheme === 'dark'
                    ? { ...styles.darkTag }
                    : { ...styles.lightTag },
                ]}
              >
                #{tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={[
            { ...styles.itemBody },
            colorScheme === 'dark' ? styles.darkText : styles.lightText,
          ]}
        >
          {body}
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <CustomStatusBar colorScheme={colorScheme} />
      <View style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}>
        <View
          style={[
            { ...styles.header },
            colorScheme === 'dark'
              ? { ...styles.darkListItemBorder }
              : { ...styles.lightListItemBorder },
          ]}
        >
          <Text
            style={[
              { ...styles.headerTitle },
              colorScheme === 'dark'
                ? { ...styles.darkText }
                : { ...styles.lightText },
            ]}
          >
            포스트 목록
          </Text>
        </View>
      </View>
      <FlatList
        data={postList}
        style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <PostItem
            id={item._id}
            title={item.title}
            publisher={item.publisher}
            publishedDate={item.publishedDate}
            tags={item.tags}
            body={item.body}
          />
        )}
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
              colorScheme === 'dark' ? palette.violet[3] : palette.pink[1]
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

export default PostList;
