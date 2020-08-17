import React from 'react';
import { View, Text } from 'react-native';
import DismissKeyboard from '../common/DismissKeyboard';
import { styles } from './StyleContainer';

const InfoComponent = ({ colorScheme }) => {
  return (
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
          MAKE UP HARA - 통합검색
        </Text>
        <Text
          style={[
            styles.infoSubTitle,
            colorScheme === 'dark'
              ? { ...styles.darkText, ...styles.darkSubinfo }
              : { ...styles.lightText, ...styles.lightSubinfo },
          ]}
        >
          위키 문서, 블로그 포스트를 검색할 수 있습니다.
        </Text>
        <Text
          style={[
            styles.infoSubTitle,
            colorScheme === 'dark'
              ? { ...styles.darkText, ...styles.darkSubinfo }
              : { ...styles.lightText, ...styles.lightSubinfo },
          ]}
        >
          검색 결과가 최신 업데이트 순서로 제공됩니다.
        </Text>
      </View>
    </DismissKeyboard>
  );
};

export default InfoComponent;
