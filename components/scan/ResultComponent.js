import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getHistory } from '../../module/redux/scan';
import palette from '../../lib/styles/open-color';
import CustomStatusBar from '../common/CustomStatusBar';
import getInnerHtml from '../../lib/getInnerHtml';
import LoadingComponent from '../common/LoadingComponent';

const ResultComponent = ({
  navigation,
  colorScheme,
  document,
  loading,
  error,
}) => {
  if (loading || !document) {
    return <LoadingComponent colorScheme={colorScheme} />;
  }
  if (error) {
    return (
      <View
        style={[
          { ...styles.error },
          colorScheme === 'dark'
            ? { ...styles.darkError }
            : { ...styles.lightError },
        ]}
      >
        <CustomStatusBar colorScheme={colorScheme} />
        <View
          style={
            colorScheme === 'dark' ? styles.darkHeader : styles.lightHeader
          }
        >
          <View style={styles.titleBox}>
            <Text
              style={[
                { ...styles.title },
                colorScheme === 'dark'
                  ? { ...styles.darkTitle }
                  : { ...styles.lightTitle },
              ]}
            >
              스캔 결과
            </Text>
          </View>
        </View>
        <Text
          style={[
            { ...styles.errorMessage },
            colorScheme === 'dark'
              ? { ...styles.darkError }
              : { ...styles.lightError },
          ]}
        >
          {document.message}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              { ...styles.button },
              colorScheme === 'dark'
                ? { ...styles.darkButton }
                : { ...styles.lightButton },
            ]}
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
      <CustomStatusBar colorScheme={colorScheme} />
      <View
        style={colorScheme === 'dark' ? styles.darkHeader : styles.lightHeader}
      >
        <View style={styles.titleBox}>
          <Text
            style={[
              { ...styles.title },
              colorScheme === 'dark'
                ? { ...styles.darkTitle }
                : { ...styles.lightTitle },
            ]}
          >
            {titleName}
          </Text>
        </View>
        <View style={styles.dateBox}>
          <Text
            style={[
              { ...styles.date },
              colorScheme === 'dark'
                ? { ...styles.darkDate }
                : { ...styles.lightDate },
            ]}
          >
            마지막 업데이트: {moment(publishedDate).format('YYYY-MM-DD')}
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
          source={{ html: getInnerHtml({ body, colorScheme }) }}
          style={[
            { ...styles.web },
            colorScheme === 'dark'
              ? { ...styles.darkWeb }
              : { ...styles.lightWeb },
          ]}
        />
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[
            { ...styles.button, ...styles.buttonFirst },
            colorScheme === 'dark'
              ? { ...styles.darkButton }
              : { ...styles.lightButton },
          ]}
          onPress={() => {
            dispatch(getHistory({ title: title.name }));
            navigation.push('HistoryListComponent');
          }}
        >
          <Text>히스토리</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { ...styles.button },
            colorScheme === 'dark'
              ? { ...styles.darkButton }
              : { ...styles.lightButton },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightHeader: {
    backgroundColor: palette.gray[0],
  },
  darkHeader: {
    backgroundColor: palette.gray[9],
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
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  lightTitle: {
    backgroundColor: palette.pink[1],
    color: palette.gray[9],
  },
  darkTitle: {
    backgroundColor: palette.violet[9],
    color: palette.gray[0],
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
  },
  lightDate: {
    backgroundColor: palette.pink[0],
    color: palette.gray[9],
  },
  darkDate: {
    backgroundColor: palette.violet[7],
    color: palette.gray[0],
  },
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
  },
  web: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  lightWeb: {
    backgroundColor: palette.gray[0],
    borderColor: palette.red[2],
    color: palette.gray[9],
  },
  darkWeb: {
    backgroundColor: palette.gray[9],
    borderColor: palette.violet[5],
    color: palette.gray[0],
  },
  buttonSection: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  buttonFirst: {
    borderRightWidth: 1,
  },
  lightButton: {
    backgroundColor: palette.pink[1],
    borderColor: palette.red[2],
  },
  darkButton: {
    backgroundColor: palette.violet[3],
    borderColor: palette.violet[5],
  },
  error: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lightError: {
    backgroundColor: palette.gray[0],
    color: palette.gray[9],
  },
  darkError: {
    backgroundColor: palette.gray[9],
    color: palette.gray[0],
  },
  errorMessage: {
    fontSize: 20,
    margin: 16,
    marginTop: 0,
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
