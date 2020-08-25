import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './StyleContainer';
import DismissKeyboard from '../common/DismissKeyboard';
import SearchComponent from '../search/SearchComponent';
import { WikiResultSearch } from '../search/ResultComponent';
import { Button, Overlay } from 'react-native-elements';

const RegistOverlay = ({
  visible,
  toggleOverlay,
  documentName,
  barcode,
  colorScheme,
}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}
    >
      <View
        style={[
          styles.overlayContainer,
          colorScheme === 'dark'
            ? { ...styles.darkBody }
            : { ...styles.lightBody },
        ]}
      >
        <Text
          style={[
            styles.overlayText,
            colorScheme === 'dark'
              ? { ...styles.darkText }
              : { ...styles.lightText },
          ]}
        >
          문서 이름
        </Text>
        <Text
          style={[
            styles.overlayText,
            colorScheme === 'dark'
              ? { ...styles.darkSubText }
              : { ...styles.lightThemeColor },
          ]}
        >
          [{documentName}]
        </Text>
        <Text
          style={[
            styles.overlayText,
            colorScheme === 'dark'
              ? { ...styles.darkText }
              : { ...styles.lightText },
          ]}
        >
          바코드 정보
        </Text>
        <Text
          style={[
            styles.overlayText,
            colorScheme === 'dark'
              ? { ...styles.darkSubText }
              : { ...styles.lightThemeColor },
          ]}
        >
          [{barcode}]
        </Text>
        <Text
          style={[
            styles.overlayTextCenter,
            colorScheme === 'dark'
              ? { ...styles.darkText }
              : { ...styles.lightText },
          ]}
        >
          해당 문서에 바코드 정보를 등록하시겠습니까?
        </Text>
        <View style={styles.overlayButtonContainer}>
          <Button
            buttonStyle={[
              styles.overlayButton,
              colorScheme === 'dark'
                ? { ...styles.darkOverlayButtonComfirm }
                : { ...styles.lightOverlayButtonComfirm },
            ]}
            title={'등록'}
          />
          <Button
            type="clear"
            titleStyle={styles.overlayTextButtonCancel}
            title={'취소'}
          />
        </View>
      </View>
    </Overlay>
  );
};

const InfoComponent = ({ barcode, colorScheme }) => (
  <DismissKeyboard>
    <View
      style={[
        { ...styles.container, ...styles.infoBody },
        colorScheme === 'dark'
          ? { ...styles.darkBody }
          : { ...styles.lightBody },
      ]}
    >
      <Text
        style={[
          styles.infoTitle,
          colorScheme === 'dark'
            ? { ...styles.darkText }
            : { ...styles.lightText },
        ]}
      >
        문서 바코드 등록
      </Text>
      <Text
        style={[
          styles.infoSubTitle,
          colorScheme === 'dark'
            ? { ...styles.darkText, ...styles.darkSubinfo }
            : { ...styles.lightText, ...styles.lightSubinfo },
        ]}
      >
        바코드를 등록할 문서를 검색하십시오.
      </Text>
      <Text
        style={[
          styles.infoSubTitle,
          colorScheme === 'dark'
            ? { ...styles.darkText, ...styles.darkSubinfo }
            : { ...styles.lightText, ...styles.lightSubinfo },
        ]}
      >
        스캔한 바코드:{' '}
        <Text
          style={
            colorScheme === 'dark'
              ? styles.darkThemeColor
              : styles.lightThemeColor
          }
        >
          {barcode}
        </Text>
      </Text>
    </View>
  </DismissKeyboard>
);

const BarcodeRegist = ({
  barcode,
  inputQuery,
  searchQuery,
  handleQueryChange,
  handleSubmit,
  colorScheme,
  documentList,
  error,
  loading,
  handleMoreList,
  handleRefresh,
  refresh,
  isLastPage,
  emptyResult,
  isRequest,
}) => {
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState(null);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const handleItemPress = (name) => {
    toggleOverlay();
    setTarget(name);
  };

  return (
    <View style={styles.container}>
      <SearchComponent
        inputQuery={inputQuery}
        handleQueryChange={handleQueryChange}
        handleSubmit={handleSubmit}
        colorScheme={colorScheme}
        placeholder="바코드를 등록할 문서 검색"
      />
      {!isRequest ? (
        <InfoComponent barcode={barcode} colorScheme={colorScheme} />
      ) : (
        <>
          <WikiResultSearch
            documentList={documentList}
            searchQuery={searchQuery}
            error={error}
            loading={loading}
            colorScheme={colorScheme}
            handleMoreList={handleMoreList}
            handleRefresh={handleRefresh}
            refresh={refresh}
            isLastPage={isLastPage}
            emptyResult={emptyResult}
            handleItemPress={handleItemPress}
          />
          <RegistOverlay
            visible={visible}
            toggleOverlay={toggleOverlay}
            documentName={target}
            barcode={barcode}
            colorScheme={colorScheme}
          />
        </>
      )}
    </View>
  );
};

export default BarcodeRegist;
