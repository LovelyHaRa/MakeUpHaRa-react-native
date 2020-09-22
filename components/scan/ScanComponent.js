import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import palette from '../../lib/styles/open-color';
import LoadingComponent from '../common/LoadingComponent';
import AccessDenied from '../common/AccessDenied';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './StyleContainer';

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
          <View style={[styles.container, styles.centerFlex]}>
            <View
              style={[
                styles.modal,
                colorScheme === 'dark' ? styles.darkModal : styles.lightModal,
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.title,
                    colorScheme === 'dark' ? styles.darkText : styles.lightText,
                  ]}
                >
                  바코드 타입:{' '}
                  {type === BarCodeScanner.Constants.BarCodeType.ean13
                    ? 'EAN-13'
                    : 'QR'}
                </Text>
                <Text
                  style={[
                    styles.title,
                    colorScheme === 'dark' ? styles.darkText : styles.lightText,
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
    <View style={[styles.container, styles.centerFlex]}>
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
