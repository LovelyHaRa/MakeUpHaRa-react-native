import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './StyleContainer';

const InfoComponent = ({ colorScheme }) => {
  return (
    <View
      style={[
        { ...styles.container, ...styles.infoBody },
        colorScheme === 'dark'
          ? { ...styles.darkBody }
          : { ...styles.lightBody },
      ]}
    >
      <Text style={colorScheme === 'dark' ? styles.darkText : styles.lightText}>
        통합 검색
      </Text>
      <Text style={colorScheme === 'dark' ? styles.darkText : styles.lightText}>
        위키 문서, 블로그 포스트를 검색할 수 있습니다.
      </Text>
      <Text style={colorScheme === 'dark' ? styles.darkText : styles.lightText}>
        검색 결과가 최신 업데이트 순서로 제공됩니다.
      </Text>
    </View>
  );
};

export default InfoComponent;
