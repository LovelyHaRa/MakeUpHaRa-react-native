import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './StyleContainer';
import DismissKeyboard from '../common/DismissKeyboard';
import SearchComponent from '../search/SearchComponent';

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
  handleQueryChange,
  handleSubmit,
  colorScheme,
}) => {
  return (
    <View style={styles.container}>
      <SearchComponent
        inputQuery={inputQuery}
        handleQueryChange={handleQueryChange}
        handleSubmit={handleSubmit}
        colorScheme={colorScheme}
        placeholder="바코드를 등록할 문서 검색"
      />
      <InfoComponent barcode={barcode} colorScheme={colorScheme} />
    </View>
  );
};

export default BarcodeRegist;
