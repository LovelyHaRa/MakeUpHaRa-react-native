import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getRevisionDocument } from '../../module/redux/scan';
import CustomStatusBar from '../common/CustomStatusBar';
import palette from '../../lib/styles/open-color';
import LoadingComponent from '../common/LoadingComponent';

const HistoryListComponent = ({
  navigation,
  colorScheme,
  historyList,
  loading,
}) => {
  if (loading || !historyList) {
    return <LoadingComponent colorScheme={colorScheme} />;
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
          <Text
            style={
              colorScheme === 'dark'
                ? styles.darkListItem
                : styles.lightListItem
            }
          >
            리비전: {revision}
          </Text>
          <Text
            style={
              colorScheme === 'dark' ? styles.darkListItem : styles.ightListItem
            }
          >
            작성 일자: {moment(publishedDate).format('YYYY-MM-DD')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CustomStatusBar colorScheme={colorScheme} />
      <View
        style={
          colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer
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
            {titleName}
          </Text>
        </View>
        <View style={styles.subTitleBox}>
          <Text
            style={[
              { ...styles.subTitle },
              colorScheme === 'dark'
                ? { ...styles.darkSubTitle }
                : { ...styles.lightSubTitle },
            ]}
          >
            문서 역사
          </Text>
        </View>
      </View>
      <FlatList
        data={historyList}
        style={
          colorScheme === 'dark'
            ? { ...styles.darkContainer }
            : { ...styles.lightContainer }
        }
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <HistoryItem
            revision={item.revision}
            publishedDate={item.publishedDate}
            borderStyle={
              index === 0
                ? [
                    { ...styles.listItemBorder, ...styles.listItemBorderTop },
                    colorScheme === 'dark'
                      ? { ...styles.darkListItemBorder }
                      : { ...styles.lightListItemBorder },
                  ]
                : [
                    { ...styles.listItemBorder },
                    colorScheme === 'dark'
                      ? { ...styles.darkListItemBorder }
                      : { ...styles.lightListItemBorder },
                  ]
            }
          />
        )}
      />
      <View style={styles.buttonSection}>
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
  lightContainer: {
    backgroundColor: palette.gray[0],
  },
  darkContainer: {
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
  },
  lightSubTitle: {
    backgroundColor: palette.pink[0],
    color: palette.gray[9],
  },
  darkSubTitle: {
    backgroundColor: palette.violet[7],
    color: palette.gray[0],
  },
  buttonSection: {
    flexDirection: 'row',
  },
  listItemBorderTop: {
    borderTopWidth: 1,
  },
  listItemBorder: {
    borderBottomWidth: 1,
  },
  lightListItemBorder: {
    borderColor: palette.red[2],
  },
  darkListItemBorder: {
    borderColor: palette.violet[5],
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  lightListItem: {
    color: palette.gray[9],
  },
  darkListItem: {
    color: palette.gray[0],
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
});

export default HistoryListComponent;
