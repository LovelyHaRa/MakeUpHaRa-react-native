import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getHistory } from '../../module/redux/scan';

const getInnerHtml = (body) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
  <body>
    ${body}
  </body>
  </html>
  `;
};

const ResultComponent = ({ navigation, document, loading, error }) => {
  if (loading || !document) {
    return (
      <View style={{ ...styles.container, ...styles.loading }}>
        <ActivityIndicator size="large" color="#d6336c" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.error}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>스캔 결과</Text>
          </View>
        </View>
        <Text style={styles.errorMessage}>{document.message}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.errorButtonText}>뒤로가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const dispatch = useDispatch();
  const { title, publishedDate, body } = document;
  const titleName =
    title.name.length <= 30 ? title.name : title.name.slice(0, 25) + '...';
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{titleName}</Text>
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.date}>
            마지막 업데이트: {moment(publishedDate).format('YYYY-MM-DD')}
          </Text>
        </View>
      </View>
      <View style={styles.webContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: getInnerHtml(body) }}
          style={styles.web}
        />
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.buttonFirst }}
          onPress={() => {
            dispatch(getHistory({ title: title.name }));
            navigation.push('HistoryListComponent');
          }}
        >
          <Text style={styles.buttonText}>히스토리</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
  },
  titleBox: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    backgroundColor: '#ffdeeb',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  dateBox: {
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: 14,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 8,
    borderRadius: 5,
    backgroundColor: '#fff0f6',
  },
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#ffdeeb',
    borderRadius: 5,
  },
  web: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 8,
    marginRight: 8,
    borderColor: '#ffdeeb',
  },
  buttonSection: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffdeeb',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#ffc9c9',
    borderBottomColor: '#ffc9c9',
  },
  buttonFirst: {
    borderRightWidth: 1,
    borderColor: '#ffc9c9',
  },
  buttonText: {},
  error: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorMessage: {
    fontSize: 20,
    margin: 16,
  },
  errorButton: {
    flex: 1,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ffdeeb',
    borderWidth: 2,
    borderColor: '#ffc9c9',
    borderRadius: 5,
    alignItems: 'center',
  },
  errorButtonText: { fontSize: 16 },
});

export default ResultComponent;