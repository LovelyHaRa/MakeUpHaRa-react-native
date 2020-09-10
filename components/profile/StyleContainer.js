import { StyleSheet } from 'react-native';
import palette from '../../lib/styles/open-color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  centerFlex: { flex: 1, justifyContent: 'center' },
  lightBody: {
    backgroundColor: palette.gray[0],
  },
  header: {
    marginTop: 4,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingLeft: 12,
    paddingRight: 4,
    paddingTop: 16,
    paddingBottom: 16,
  },
  changePasswordTitleContainer: {
    justifyContent: 'center',
    margin: 20,
  },
  changePasswordTitle: {
    fontFamily: 'NanumGothic_400Regular',
    fontSize: 32,
    margin: 4,
  },
  changePasswordSubTitle: {
    fontSize: 16,
    margin: 4,
    marginLeft: 8,
  },
  changePasswordInputContainer: {
    margin: 16,
  },
  changePasswordInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderRadius: 0,
    height: 48,
    padding: 4,
    margin: 10,
    fontSize: 16,
  },
  lightChangePasswordInput: {
    borderColor: palette.pink[5],
    color: palette.gray[9],
  },
  darkChangePasswordInput: {
    borderColor: palette.violet[3],
    color: palette.gray[0],
  },
  changePasswordButtonContainer: {
    margin: 16,
  },
  changePasswordButton: {
    margin: 10,
    height: 48,
    borderRadius: 10,
  },
  lightChangePasswordButton: {
    backgroundColor: palette.red[4],
  },
  darkChangePasswordButton: {
    backgroundColor: palette.violet[4],
  },
});
