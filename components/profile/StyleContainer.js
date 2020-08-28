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
  lightErrorText: {
    color: palette.red[5],
  },
  darkErrorText: {
    color: palette.red[3],
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
  overlayContainer: { margin: 8 },
  overlayText: {
    margin: 8,
    fontSize: 16,
  },
  overlayTextCenter: {
    margin: 8,
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  overlayButtonContainer: {
    margin: 16,
  },
  overlayButton: {
    marginBottom: 28,
  },
  darkOverlayButtonComfirm: { backgroundColor: palette.violet[7] },
  lightOverlayButtonComfirm: { backgroundColor: palette.cyan[7] },
  overlayButtonCancel: { color: palette.red[5] },
  lightOverlayButtonClose: { backgroundColor: palette.red[5] },
  darkOverlayButtonClose: { backgroundColor: palette.red[3] },
  overlayResultText: {
    textAlign: 'center',
    fontSize: 18,
    margin: 12,
  },
});
