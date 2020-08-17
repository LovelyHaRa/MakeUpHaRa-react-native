import { StyleSheet } from 'react-native';
import palette from '../../lib/styles/open-color';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  centerFlex: { flex: 1, justifyContent: 'center' },
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
  lightThemeBackgroundColor: {
    backgroundColor: palette.pink[1],
  },
  darkThemeBackgroundColor: {
    backgroundColor: palette.violet[9],
  },
  lightThemeColor: {
    color: palette.pink[5],
  },
  darkThemeColor: {
    color: palette.violet[9],
  },
  logoContainer: {
    justifyContent: 'center',
    margin: 20,
  },
  logo: {
    fontFamily: 'NanumGothic_400Regular',
    fontSize: 32,
    margin: 4,
  },
  subTitle: { fontSize: 16, margin: 4 },
  inputContainer: { margin: 16 },
  input: {
    backgroundColor: 'transparent',
    borderColor: '#ba5370',
    borderBottomWidth: 2,
    borderRadius: 0,
    height: 48,
    padding: 4,
    margin: 10,
    fontSize: 16,
  },
  lightInput: {
    borderColor: palette.pink[5],
    color: palette.gray[9],
  },
  darkInput: {
    borderColor: palette.violet[3],
    color: palette.gray[0],
  },
  buttonContainer: {
    margin: 16,
  },
  button: {
    margin: 10,
    height: 48,
    borderRadius: 10,
  },
  lightLoginButton: {
    backgroundColor: palette.red[4],
  },
  darkLoginButton: {
    backgroundColor: palette.violet[4],
  },
  lightSignUpButton: {
    backgroundColor: palette.red[3],
  },
  darkSignUpButton: {
    backgroundColor: palette.violet[3],
  },
  goBacktoLogin: {
    alignItems: 'center',
    marginTop: 12,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  footerText: {
    fontFamily: 'NanumGothic_400Regular',
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorText: {
    color: palette.red[7],
  },
});
