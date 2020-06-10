import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';
import dayjs from 'dayjs';

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

const ResultComponent = ({ resultScan, loading }) => {
  if (loading) {
    return null;
  }
  const { title, publishedDate, body } = resultScan;
  const titleName =
    title.name.length <= 30 ? title.name : title.name.slice(0, 30);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>{titleName}</Text>
        <Text style={styles.date}>
          마지막 업데이트: {dayjs(publishedDate).format('YYYY-MM-DD')}
        </Text>
      </View>
      <WebView
        originWhitelist={['*']}
        source={{ html: getInnerHtml(body) }}
        style={{ p: { fontSize: '1rem' } }}
      />
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>히스토리</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 8,
    marginRight: 8,
  },
  date: {
    fontSize: 14,
    marginLeft: 8,
    marginRight: 8,
    textAlign: 'right',
  },
  buttonSection: {
    flexDirection: 'row',
  },
  button: { flex: 1, alignItems: 'center', padding: 12 },
  buttonText: {},
});

export default ResultComponent;
