import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleContainer';
import DismissKeyboard from '../common/DismissKeyboard';
import SearchComponent from '../search/SearchComponent';
import { WikiResultSearch } from '../search/ResultComponent';
import { Button, Overlay, SearchBar } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import ResponsiveView from '../common/ResponsiveView';

const RegistOverlay = ({
  visible,
  toggleOverlay,
  documentName,
  barcode,
  colorScheme,
  addBarcodeLoading,
  handlePress,
  resultMessage,
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
          colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
        ]}
      >
        <Text
          style={[
            styles.overlayText,
            colorScheme === 'dark' ? styles.darkText : styles.lightText,
          ]}
        >
          문서 이름
        </Text>
        <Text
          style={[
            styles.overlayText,
            colorScheme === 'dark'
              ? styles.darkSubText
              : styles.lightThemeColor,
          ]}
        >
          [{documentName}]
        </Text>
        <Text
          style={[
            styles.overlayText,
            colorScheme === 'dark' ? styles.darkText : styles.lightText,
          ]}
        >
          바코드 정보
        </Text>
        <Text
          style={[
            styles.overlayText,
            colorScheme === 'dark'
              ? styles.darkSubText
              : styles.lightThemeColor,
          ]}
        >
          [{barcode}]
        </Text>
        <Text
          style={[
            styles.overlayTextCenter,
            colorScheme === 'dark' ? styles.darkText : styles.lightText,
          ]}
        >
          해당 문서에 바코드 정보를 등록하시겠습니까?
        </Text>

        <View style={styles.overlayButtonContainer}>
          {resultMessage.state ? (
            <>
              {resultMessage.success != '' && (
                <Text
                  style={[
                    styles.overlayResultText,
                    colorScheme === 'dark'
                      ? styles.darkSubText
                      : styles.lightThemeColor,
                  ]}
                >
                  {resultMessage.success}
                </Text>
              )}
              {resultMessage.failure != '' && (
                <Text
                  style={[
                    styles.overlayResultText,
                    colorScheme === 'dark'
                      ? styles.darkErrorText
                      : styles.lightErrorText,
                  ]}
                >
                  {resultMessage.failure}
                </Text>
              )}
              <Button
                buttonStyle={
                  colorScheme === 'dark'
                    ? styles.darkOverlayButtonClose
                    : styles.lightOverlayButtonClose
                }
                title={'닫기'}
                onPress={toggleOverlay}
              />
            </>
          ) : addBarcodeLoading ? (
            <Button
              buttonStyle={[
                styles.overlayButton,
                colorScheme === 'dark'
                  ? styles.darkOverlayButtonComfirm
                  : styles.lightOverlayButtonComfirm,
              ]}
              loading
            />
          ) : (
            <>
              <Button
                buttonStyle={[
                  styles.overlayButton,
                  colorScheme === 'dark'
                    ? styles.darkOverlayButtonComfirm
                    : styles.lightOverlayButtonComfirm,
                ]}
                onPress={() => handlePress(documentName)}
                title={'등록'}
              />
              <Button
                type="clear"
                titleStyle={styles.overlayTextButtonCancel}
                title={'취소'}
                onPress={toggleOverlay}
              />
            </>
          )}
        </View>
      </View>
    </Overlay>
  );
};

const InfoComponent = ({ barcode, colorScheme }) => (
  <DismissKeyboard>
    <View
      style={[
        styles.container,
        styles.infoBody,
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
      ]}
    >
      <Text
        style={[
          styles.infoTitle,
          colorScheme === 'dark' ? styles.darkText : styles.lightText,
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
  addBarcodeLoading,
  handlePress,
  hadnleBackPress,
  resultMessage,
  initResultMessage,
}) => {
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState(null);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const handleItemPress = (name) => {
    initResultMessage();
    toggleOverlay();
    setTarget(name);
  };

  return (
    <ResponsiveView containerStyle={styles.container} colorScheme={colorScheme}>
      <View
        style={[
          styles.searchBarContainer,
          colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => hadnleBackPress()}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={36}
            color={
              colorScheme === 'dark'
                ? styles.darkText.color
                : styles.lightText.color
            }
          />
        </TouchableOpacity>
        <SearchBar
          onSubmitEditing={handleSubmit}
          lightTheme={colorScheme !== 'dark'}
          containerStyle={
            colorScheme === 'dark'
              ? styles.darksearchBarContainer
              : styles.lightsearchBarContainer
          }
          onChangeText={handleQueryChange}
          placeholder={'바코드를 등록할 문서 검색'}
          value={inputQuery}
        />
      </View>

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
            addBarcodeLoading={addBarcodeLoading}
            handlePress={handlePress}
            resultMessage={resultMessage}
          />
        </>
      )}
    </ResponsiveView>
  );
};

export default BarcodeRegist;
