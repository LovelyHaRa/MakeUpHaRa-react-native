import React from 'react';
import { Text, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { styles } from './StyleContainer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import ResponsiveView from '../common/ResponsiveView';

const InfoComponent = ({ navigation }) => {
  const colorScheme = useColorScheme();
  return (
    <ResponsiveView
      containerStyle={[
        styles.container,
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody,
      ]}
      colorScheme={colorScheme}
    >
      <View style={styles.infoContainer}>
        <View style={styles.infoIcon}>
          <MaterialCommunityIcons
            name="barcode-scan"
            size={72}
            color={
              colorScheme === 'dark'
                ? styles.darkText.color
                : styles.lightText.color
            }
          />
        </View>
        <View style={styles.infoTitleContainer}>
          <Text
            style={[
              styles.infoTitleText,
              colorScheme === 'dark' ? styles.darkText : styles.lightText,
            ]}
          >
            바코드를 스캔하여
          </Text>
          <Text
            style={[
              styles.infoTitleText,
              colorScheme === 'dark' ? styles.darkText : styles.lightText,
            ]}
          >
            위키 정보를 검색 할 수 있습니다
          </Text>
        </View>
        <Button
          title="스캔하기"
          buttonStyle={[
            styles.infoSubminButton,
            colorScheme === 'dark'
              ? styles.darkInfoSubminButton
              : styles.lightInfoSubminButton,
          ]}
          titleStyle={styles.infoSubminButtonTitle}
          onPress={() => navigation.push('ScanComponent')}
        />
      </View>
    </ResponsiveView>
  );
};

export default InfoComponent;
