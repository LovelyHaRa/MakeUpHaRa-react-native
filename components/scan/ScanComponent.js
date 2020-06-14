import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  Alert,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch } from 'react-redux';
import { getDocumentByBarcode } from '../../module/redux/scan';

export default function ScanComponent({ navigation, onCamera }) {
  if (!onCamera) {
    return null;
  }
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scandata, setScanData] = useState(null);

  const dispatch = useDispatch();

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
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.container}>
            <View style={styles.modal}>
              <Text style={styles.title}>
                바코드 타입:{' '}
                {type === BarCodeScanner.Constants.BarCodeType.ean13
                  ? 'EAN-13'
                  : 'QR'}
              </Text>
              <Text style={styles.title}>코드내용: {data}</Text>
              <View style={styles.buttonGroup}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    dispatch(getDocumentByBarcode({ code: data }));
                    navigation.push('ResultComponent');
                  }}
                >
                  <Text>문서 보기</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={codeTypes}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <>
          <Button
            title={'Tap to Scan Again'}
            onPress={() => setScanned(false)}
            color="#364fc7"
          />
          <ScanResult />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.2,
    marginTop: Dimensions.get('window').height * 0.4,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  title: {
    margin: 10,
    textAlign: 'center',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
