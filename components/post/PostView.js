import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import { styles } from './StyleContainer';
import moment from 'moment';
import WebView from 'react-native-webview';
import getInnerHtml from '../../lib/getInnerHtml';
import LoadingComponent from '../common/LoadingComponent';
import { MaterialIcons } from '@expo/vector-icons';
import ResponsiveView from '../common/ResponsiveView';

const Container = ({ children, style, colorScheme }) =>
  Platform.OS === 'ios' ? (
    <SafeAreaView
      style={[
        style,
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
      ]}
    >
      <View style={style}>{children}</View>
    </SafeAreaView>
  ) : (
    <View style={style}>{children}</View>
  );

const PostView = ({ post, error, loading, colorScheme, navigation }) => {
  if (loading) {
    return <LoadingComponent colorScheme={colorScheme} />;
  }
  if (error) {
    return (
      <ResponsiveView style={[styles.container]} colorScheme={colorScheme}>
        <Text>잘못된 접근입니다.</Text>
      </ResponsiveView>
    );
  }
  const { title, publisher, publishedDate, tags, body } = post;
  return (
    <Container style={styles.container} colorScheme={colorScheme}>
      <View style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}>
        <View
          style={[
            styles.header,
            colorScheme === 'dark'
              ? styles.darkListItemBorder
              : styles.lightListItemBorder,
          ]}
        >
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={
                colorScheme === 'dark'
                  ? styles.darkText.color
                  : styles.lightText.color
              }
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              colorScheme === 'dark' ? styles.darkText : styles.lightText,
            ]}
          >
            포스트
          </Text>
        </View>

        <View style={styles.topContainer}>
          <Text
            style={[
              styles.title,
              colorScheme === 'dark' ? styles.darkTitle : styles.lightTitle,
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.subinfo,
              colorScheme === 'dark' ? styles.darkSubinfo : styles.lightSubinfo,
            ]}
          >
            {publisher.username}
          </Text>
          <Text
            style={[
              styles.subinfo,
              colorScheme === 'dark' ? styles.darkSubinfo : styles.lightSubinfo,
            ]}
          >
            {moment(publishedDate).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <View style={styles.tagContainer}>
            {tags.map((tag) => (
              <Text
                key={tag}
                style={[
                  styles.tag,
                  colorScheme === 'dark' ? styles.darkTag : styles.lightTag,
                ]}
              >
                #{tag}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View style={[styles.webContainer]}>
        <WebView
          originWhitelist={['*']}
          source={{
            html: getInnerHtml({ body, colorScheme }),
          }}
          style={[
            styles.web,
            colorScheme === 'dark' ? styles.darkWeb : styles.lightWeb,
          ]}
        />
      </View>
    </Container>
  );
};

export default PostView;
