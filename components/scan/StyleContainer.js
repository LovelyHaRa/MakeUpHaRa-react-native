import { StyleSheet, Dimensions } from 'react-native';
import palette from '../../lib/styles/open-color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanInfoContainer: {
    flex: 1,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  scanText: { color: palette.gray[1], fontSize: 18, textAlign: 'center' },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  focusContainer: {
    flex: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.15,
    marginTop: Dimensions.get('window').height * 0.65,
    borderRadius: 8,
    elevation: 10,
  },
  lightModal: { backgroundColor: palette.pink[0] },
  darkModal: { backgroundColor: palette.gray[8] },
  title: {
    fontFamily: 'NanumGothic_400Regular',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5,
  },
  button: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  lightButton: {
    backgroundColor: palette.pink[2],
  },
  darkButton: {
    backgroundColor: palette.violet[2],
  },
  lightBody: {
    backgroundColor: palette.gray[0],
  },
  darkBody: {
    backgroundColor: palette.gray[9],
  },
  backButton: {
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 8,
  },
  lightText: {
    color: palette.gray[9],
  },
  darkText: {
    color: palette.gray[0],
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitleContainer: { margin: 16 },
  infoTitleText: {
    fontFamily: 'NanumGothic_400Regular',
    fontSize: 16,
    margin: 4,
  },
  infoSubminButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  infoSubminButtonTitle: {
    fontFamily: 'NanumGothic_400Regular',
  },
  lightInfoSubminButton: { backgroundColor: palette.red[4] },
  darkInfoSubminButton: { backgroundColor: palette.violet[4] },
});
