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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    fontFamily: 'NanumGothic_700Bold',
    fontSize: 32,
    color: palette.gray[0],
    margin: 4,
  },
  inputContainer: { margin: 16 },
  input: {
    backgroundColor: 'transparent',
    borderColor: '#ba5370',
    borderWidth: 2,
    borderRadius: 10,
    height: 48,
    padding: 10,
    margin: 10,
    fontSize: 16,
  },
  buttonContainer: {
    margin: 16,
  },
  button: {
    backgroundColor: '#cc7e8f',
    margin: 10,
    height: 48,
    borderRadius: 10,
  },
});
