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
  lightsearchBarContainer: {
    backgroundColor: palette.gray[0],
    borderBottomColor: palette.gray[3],
    borderTopColor: 'transparent',
  },
  darksearchBarContainer: {
    backgroundColor: palette.gray[9],
    borderColor: palette.gray[9],
    borderBottomColor: palette.gray[8],
    borderTopColor: 'transparent',
  },
  lightThemeBackgroundColor: {
    backgroundColor: palette.cyan[7],
  },
  darkThemeBackgroundColor: {
    backgroundColor: palette.violet[7],
  },
  lightThemeColor: {
    color: palette.cyan[7],
  },
  darkThemeColor: {
    color: palette.violet[7],
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    marginRight: 8,
  },
  lightSubinfo: { color: palette.gray[6] },
  darkSubinfo: { color: palette.gray[5] },
});
