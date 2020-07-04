import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './StyleContainer';
import moment from 'moment';
import WebView from 'react-native-webview';
import getInnerHtml from '../../lib/getInnerHtml';
import CustomStatusBar from '../common/CustomStatusBar';
import LoadingComponent from '../common/LoadingComponent';

const PostView = ({ post, error, loading, colorScheme }) => {
  if (loading || !post) {
    return <LoadingComponent colorScheme={colorScheme} />;
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text>잘못된 접근입니다.</Text>
      </View>
    );
  }
  const { title, publisher, publishedDate, tags, body } = post;
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
            {title}
          </Text>
          <Text
            style={[
              { ...styles.subinfo },
              colorScheme === 'dark'
                ? { ...styles.darkSubinfo }
                : { ...styles.lightSubinfo },
            ]}
          >
            {publisher.usename}
          </Text>
          <Text
            style={[
              { ...styles.subinfo },
              colorScheme === 'dark'
                ? { ...styles.darkSubinfo }
                : { ...styles.lightSubinfo },
            ]}
          >
            {moment(publishedDate).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <View style={styles.tagContainer}>
            {tags.map((tag) => (
              <Text
                key={tag}
                style={[
                  { ...styles.tag },
                  colorScheme === 'dark'
                    ? { ...styles.darkTag }
                    : { ...styles.lightTag },
                ]}
              >
                #{tag}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View
        style={[
          { ...styles.webContainer },
          colorScheme === 'dark'
            ? { ...styles.darkWeb }
            : { ...styles.lightWeb },
        ]}
      >
        <WebView
          originWhitelist={['*']}
          source={{
            html: getInnerHtml({ body, colorScheme }),
          }}
          style={[
            { ...styles.web },
            colorScheme === 'dark'
              ? { ...styles.darkWeb }
              : { ...styles.lightWeb },
          ]}
        />
      </View>
    </View>
  );
};

export default PostView;
