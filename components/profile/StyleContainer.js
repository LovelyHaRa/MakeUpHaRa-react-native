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
  lightSubText: {
    color: palette.gray[6],
  },
  darkSubText: {
    color: palette.gray[5],
  },
  lightThemeColor: {
    color: palette.cyan[7],
  },
  darkThemeColor: {
    color: palette.violet[7],
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 12,
    marginRight: 12,
  },
  username: { fontSize: 32, fontWeight: '700' },
  name: { fontSize: 18 },
  menu: {
    flex: 1,
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
  infoBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 22,
    margin: 40,
    fontFamily: 'NanumGothic_400Regular',
  },
  infoSubTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'NanumGothic_400Regular',
  },
  resultInfoTitle: {
    fontSize: 16,
    margin: 16,
    marginBottom: 28,
    fontFamily: 'NanumGothic_400Regular',
  },
  resultInfoSubTitle: {
    fontSize: 16,
    margin: 16,
    marginBottom: 4,
    fontFamily: 'NanumGothic_400Regular',
  },
});
