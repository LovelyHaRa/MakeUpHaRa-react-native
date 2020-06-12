import React from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const HistoryListComponent = ({ navigation }) => {
  const data = [
    { id: '0', history: 'r3', updateDate: '2020-06-12' },
    { id: '1', history: 'r2', updateDate: '2020-06-11' },
    { id: '2', history: 'r1', updateDate: '2020-06-10' },
  ];
  const HistoryItem = ({ history, updateDate }) => {
    return (
      <TouchableOpacity style={styles.listItem}>
        <Text>리비전: {history}</Text>
        <Text>작성 일자: {updateDate}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>타이틀네임</Text>
        </View>
        <View style={styles.subTitleBox}>
          <Text style={styles.subTitle}>문서 역사</Text>
        </View>
      </View>
      <FlatList
        data={data}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <HistoryItem history={item.history} updateDate={item.updateDate} />
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
    borderTopWidth: 1,
    borderTopColor: '#ffc9c9',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ffc9c9',
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
