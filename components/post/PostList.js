import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './StyleContainer';
import CustomStatusBar from '../common/CustomStatusBar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { readPost } from '../../module/redux/post';
import LoadingComponent from '../common/LoadingComponent';

const PostList = ({ postList, error, loading, navigation, colorScheme }) => {
  if (loading) {
    return <LoadingComponent colorScheme={colorScheme} />;
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text>잘못된 접근입니다.</Text>
      </View>
    );
  }
  const dispatch = useDispatch();
  const PostItem = ({ id, title, publisher, publishedDate, tags, body }) => (
    <View>
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
                  { ...styles.tag },
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
        <View style={styles.header}>
          <Text
            style={[
              { ...styles.title },
              colorScheme === 'dark'
                ? { ...styles.darkTitle }
                : { ...styles.lightTitle },
            ]}
          >
            BLOG
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
      />
    </View>
  );
};

export default PostList;
