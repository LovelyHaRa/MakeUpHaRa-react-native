import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import moment from 'moment';
import styles from './StyleContainer';
import getInnerHtml from '../../lib/getInnerHtml';
import LoadingComponent from '../common/LoadingComponent';
import HistoryActionButton from './HistoryActionButton';
import TitleWithBackButton from './TitleWithBackButton';
import ResponsiveView from '../common/ResponsiveView';

const DocumentViewComponent = ({
  historyListComponent,
  getHistory,
  colorScheme,
  document,
  loading,
  error,
  handleHistoryPress,
  handleBackPress,
}) => {
  if (loading) {
    return <LoadingComponent colorScheme={colorScheme} />;
  }
  if (error) {
    return (
      <ResponsiveView
        containerStyle={[
          styles.error,
          colorScheme === 'dark' ? styles.darkError : styles.lightError,
        ]}
        colorScheme={colorScheme}
      >
        <View
          style={
            colorScheme === 'dark' ? styles.darkHeader : styles.lightHeader
          }
        >
          <TitleWithBackButton
            colorScheme={colorScheme}
            handleBackPress={handleBackPress}
          >
            <View style={styles.titleBox}>
              <Text
                style={[
                  styles.title,
                  colorScheme === 'dark' ? styles.darkTitle : styles.lightTitle,
                ]}
              >
                스캔 결과
              </Text>
            </View>
          </TitleWithBackButton>
        </View>
        <Text
          style={[
            styles.errorMessage,
            colorScheme === 'dark' ? styles.darkError : styles.lightError,
          ]}
        >
          {document.message}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              styles.button,
              colorScheme === 'dark' ? styles.darkButton : styles.lightButton,
            ]}
            onPress={() => handleBackPress()}
          >
            <Text style={styles.errorButtonText}>뒤로가기</Text>
          </TouchableOpacity>
        </View>
      </ResponsiveView>
    );
  }
  const { title, publishedDate, body } = document;
  const titleName =
    title.name.length <= 30 ? title.name : title.name.slice(0, 25) + '...';
  return (
    <ResponsiveView
      containerStyle={[styles.container]}
      colorScheme={colorScheme}
    >
      <View
        style={[
          colorScheme === 'dark' ? styles.darkHeader : styles.lightHeader,
        ]}
      >
        <TitleWithBackButton
          colorScheme={colorScheme}
          handleBackPress={handleBackPress}
        >
          <View style={styles.titleBox}>
            <Text
              style={[
                styles.title,
                colorScheme === 'dark' ? styles.darkTitle : styles.lightTitle,
              ]}
            >
              {titleName}
            </Text>
          </View>
        </TitleWithBackButton>
        <View style={styles.dateBox}>
          <Text
            style={[
              styles.date,
              colorScheme === 'dark' ? styles.darkDate : styles.lightDate,
            ]}
          >
            문서 업데이트: {moment(publishedDate).format('YYYY-MM-DD')}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.webContainer,
          colorScheme === 'dark' ? styles.darkWeb : styles.lightWeb,
        ]}
      >
        <WebView
          originWhitelist={['*']}
          source={{ html: getInnerHtml({ body, colorScheme }) }}
          style={[
            styles.web,
            colorScheme === 'dark' ? styles.darkWeb : styles.lightWeb,
          ]}
        />
      </View>
      <HistoryActionButton
        colorScheme={colorScheme}
        getHistory={getHistory}
        title={title}
        component={historyListComponent}
        handleHistoryPress={handleHistoryPress}
        handleBackPress={handleBackPress}
      />
    </ResponsiveView>
  );
};

export default DocumentViewComponent;
