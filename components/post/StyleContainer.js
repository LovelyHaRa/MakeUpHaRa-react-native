import { StyleSheet } from 'react-native';
import palette from '../../lib/styles/open-color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightBody: {
    backgroundColor: palette.gray[0],
  },
  darkBody: {
    backgroundColor: palette.gray[9],
  },
  lightText: {
    color: palette.gray[9],
  },
  darkText: {
    color: palette.gray[0],
  },
  header: {
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    flexWrap: 'wrap',
  },
  lightTitle: {
    color: palette.gray[9],
  },
  darkTitle: {
    color: palette.gray[0],
  },
  subinfo: {
    fontSize: 18,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 4,
    borderRadius: 5,
  },
  lightSubinfo: { color: palette.gray[6] },
  darkSubinfo: { color: palette.gray[5] },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tag: {
    fontSize: 18,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    textAlign: 'right',
  },
  lightTag: {
    color: palette.cyan[7],
  },
  darkTag: {
    color: palette.violet[7],
  },
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  listItem: { margin: 18 },
  itemTitle: { fontSize: 24, fontWeight: '700' },
  itemPublisher: { fontSize: 18, textAlign: 'right' },
  itemPublishDate: { fontSize: 18, textAlign: 'right' },
  itemTag: { fontSize: 18, textAlign: 'right' },
  itemBody: { fontSize: 16 },
  listItemBorder: {
    borderBottomWidth: 1,
  },
  lightListItemBorder: {
    borderColor: palette.gray[3],
  },
  darkListItemBorder: {
    borderColor: palette.gray[7],
  },
});
