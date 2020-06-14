import React from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { getRevisionDocument } from '../../module/redux/scan';

const HistoryListComponent = ({ navigation, historyList, loading }) => {
  if (loading || !historyList) {
    return (
      <View style={{ ...styles.container, ...styles.loading }}>
        <ActivityIndicator size="large" color="#d6336c" />
      </View>
    );
  }
  const title = historyList[0].title.name;
  const titleName = title.length <= 30 ? title : title.slice(0, 25) + '...';
  const dispatch = useDispatch();
  const HistoryItem = ({ revision, publishedDate, borderStyle }) => {
    return (
      <View style={borderStyle}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => {
            dispatch(getRevisionDocument({ title, r: revision }));
            navigation.goBack();
          }}
        >
          <Text>리비전: {revision}</Text>
          <Text>작성 일자: {dayjs(publishedDate).format('YYYY-MM-DD')}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{titleName}</Text>
        </View>
        <View style={styles.subTitleBox}>
          <Text style={styles.subTitle}>문서 역사</Text>
        </View>
      </View>
      <FlatList
        data={historyList}
        style={styles.listContainer}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <HistoryItem
            revision={item.revision}
            publishedDate={item.publishedDate}
            borderStyle={
              index === 0
                ? { ...styles.listItemBorder, ...styles.listItemBorderTop }
                : styles.listItemBorder
            }
          />
        )}
      />
      <View style={styles.buttonSection}>
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
  subTitleBox: {
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: 14,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    backgroundColor: '#fff0f6',
  },
  buttonSection: {
    flexDirection: 'row',
  },
  listContainer: {
    backgroundColor: '#fff',
  },
  listItemBorderTop: {
    borderTopWidth: 1,
    borderTopColor: '#ffc9c9',
  },
  listItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffc9c9',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
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
});

export default HistoryListComponent;
