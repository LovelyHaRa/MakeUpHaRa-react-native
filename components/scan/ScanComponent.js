import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import palette from '../../lib/styles/open-color';
import LoadingComponent from '../common/LoadingComponent';
import AccessDenied from '../common/AccessDenied';
import { MaterialIcons } from '@expo/vector-icons';

const ScanComponent = ({
  onCamera,
  colorScheme,
  handlePress,
  handleBackPress,
  buttonText,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scandata, setScanData] = useState(null);

  const codeTypes = [
    BarCodeScanner.Constants.BarCodeType.ean13,
    BarCodeScanner.Constants.BarCodeType.qr,
  ];

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModalVisible(true);
    setScanData({ type, data });
  };

  const ScanResult = () => {
    const { type, data } = scandata;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.container}>
            <View
              style={[
                styles.modal,
                colorScheme === 'dark' ? styles.darkModal : styles.lightModal,
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.text,
                    colorScheme === 'dark'
                      ? styles.darkTitle
                      : styles.lightTitle,
                  ]}
                >
                  바코드 타입:{' '}
                  {type === BarCodeScanner.Constants.BarCodeType.ean13
                    ? 'EAN-13'
                    : 'QR'}
                </Text>
                <Text
                  style={[
                    styles.text,
                    colorScheme === 'dark'
                      ? styles.darkTitle
                      : styles.lightTitle,
                  ]}
                >
                  코드내용:{' '}
                  {data.length > 20 ? `${data.slice(0, 17)}...` : data}
                </Text>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableHighlight
                  style={[
                    styles.button,
                    colorScheme === 'dark'
                      ? styles.darkButton
                      : styles.lightButton,
                  ]}
                  underlayColor={
                    colorScheme === 'dark' ? palette.violet[1] : palette.pink[1]
                  }
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    handlePress(data);
                  }}
                >
                  <Text>{buttonText}</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[
                    styles.button,
                    colorScheme === 'dark'
                      ? styles.darkButton
                      : styles.lightButton,
                  ]}
                  underlayColor={
                    colorScheme === 'dark' ? palette.violet[1] : palette.pink[1]
                  }
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text>닫기</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  if (hasPermission === null || !onCamera) {
    return <LoadingComponent colorScheme={colorScheme} />;
  }
  if (hasPermission === false) {
    return <AccessDenied target={'카메라'} colorScheme={colorScheme} />;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={codeTypes}
        style={[
          StyleSheet.absoluteFillObject,
          colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
        ]}
      >
        <>
          <View style={styles.blurContainer}>
            <View style={styles.scanInfoContainer}>
              <View style={styles.topContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => handleBackPress()}
                >
                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={48}
                    color={palette.gray[0]}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.scanText}>
                바코드/QR코드를 스캔할 수 있습니다.
              </Text>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.blurContainer} />
            <View style={styles.focusContainer} />
            <View style={styles.blurContainer} />
          </View>
          <View style={styles.blurContainer} />
        </>
      </BarCodeScanner>
      {scanned && (
        <>
          <TouchableOpacity onPress={() => setScanned(false)}>
            <View>
              <MaterialCommunityIcons
                name="refresh"
                size={120}
                color={
                  colorScheme === 'dark' ? palette.violet[3] : palette.pink[3]
                }
              />
            </View>
          </TouchableOpacity>
          <ScanResult />
        </>
      )}
    </View>
  );
};

export default React.memo(ScanComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: { fontFamily: 'NanumGothic_400Regular' },
  lightTitle: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    color: palette.gray[9],
  },
  darkTitle: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    color: palette.gray[0],
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
});
