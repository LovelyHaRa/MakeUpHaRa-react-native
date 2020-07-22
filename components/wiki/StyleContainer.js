import { StyleSheet } from 'react-native';
import palette from '../../lib/styles/open-color';

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
});

export default styles;
