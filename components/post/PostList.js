import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './StyleContainer';
import CustomStatusBar from '../common/CustomStatusBar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { readPost } from '../../module/redux/post';
<<<<<<< HEAD
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
=======

const PostList = ({ navigation, colorScheme }) => {
  const dispatch = useDispatch();
  const PostItem = ({ id, title, publisher, publishDate, tag, body }) => (
>>>>>>> 7271b9899b89b0151d28cff8855027a3bdeea3ba
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
<<<<<<< HEAD
=======
  const testitem = [
    {
      _id: '5ed8fbdcd3fb0639901ba4a8',
      title: '블로그 타이틀1',
      tag: 'testTag',
      publisher: { username: 'username1' },
      publishDate: moment(),
      body: '블로그 본문1.........',
    },
    {
      _id: '2',
      title: '블로그 타이틀2',
      tag: 'testTag',
      publisher: { username: 'username2' },
      publishDate: moment(),
      body: '블로그 본문2.........',
    },
    {
      _id: '3',
      title: '블로그 타이틀3',
      tag: 'testTag',
      publisher: { username: 'username3' },
      publishDate: moment(),
      body: '블로그 본문3.........',
    },
    {
      _id: '4',
      title: '블로그 타이틀4',
      tag: 'testTag',
      publisher: { username: 'username4' },
      publishDate: moment(),
      body: '블로그 본문4.........',
    },
    {
      _id: '5',
      title: '블로그 타이틀5',
      tag: 'testTag',
      publisher: { username: 'username5' },
      publishDate: moment(),
      body: '블로그 본문5.........',
    },
    {
      _id: '6',
      title: '블로그 타이틀6',
      tag: 'testTag',
      publisher: { username: 'username6' },
      publishDate: moment(),
      body: '블로그 본문6.........',
    },
    {
      _id: '7',
      title: '블로그 타이틀7',
      tag: 'testTag',
      publisher: { username: 'username7' },
      publishDate: moment(),
      body: '블로그 본문7.........',
    },
    {
      _id: '8',
      title: '블로그 타이틀8',
      tag: 'testTag',
      publisher: { username: 'username8' },
      publishDate: moment(),
      body: '블로그 본문8.........',
    },
    {
      _id: '9',
      title: '블로그 타이틀9',
      tag: 'testTag',
      publisher: { username: 'username9' },
      publishDate: moment(),
      body: '블로그 본문9.........',
    },
    {
      _id: '10',
      title: '블로그 타이틀10',
      tag: 'testTag',
      publisher: { username: 'username10' },
      publishDate: moment(),
      body: '블로그 본문10.........',
    },
  ];
>>>>>>> 7271b9899b89b0151d28cff8855027a3bdeea3ba
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
