import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './StyleContainer';
import moment from 'moment';
import WebView from 'react-native-webview';
import getInnerHtml from '../../lib/getInnerHtml';
import CustomStatusBar from '../common/CustomStatusBar';

const PostView = ({ colorScheme }) => {
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
            Title
          </Text>
          <Text
            style={[
              { ...styles.subinfo },
              colorScheme === 'dark'
                ? { ...styles.darkSubinfo }
                : { ...styles.lightSubinfo },
            ]}
          >
            usename
          </Text>
          <Text
            style={[
              { ...styles.subinfo },
              colorScheme === 'dark'
                ? { ...styles.darkSubinfo }
                : { ...styles.lightSubinfo },
            ]}
          >
            {moment().format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <Text
            style={[
              { ...styles.tag },
              colorScheme === 'dark'
                ? { ...styles.darkTag }
                : { ...styles.lightTag },
            ]}
          >
            #tag1 #tag2 #tag3
          </Text>
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
            html: getInnerHtml({ body: '<span>test</span>', colorScheme }),
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
