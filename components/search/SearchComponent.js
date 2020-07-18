import React from 'react';
import { View } from 'react-native';
import { styles } from './StyleContainer';
import CustomStatusBar from '../common/CustomStatusBar';
import { SearchBar } from 'react-native-elements';

const SearchComponent = ({
  searchQuery,
  handleQueryChange,
  handleSubmit,
  colorScheme,
}) => {
  return (
    <View>
      <CustomStatusBar colorScheme={colorScheme} />
      <View style={colorScheme === 'dark' ? styles.darkBody : styles.lightBody}>
        <SearchBar
          onSubmitEditing={handleSubmit}
          lightTheme={colorScheme !== 'dark'}
          containerStyle={
            colorScheme === 'dark'
              ? styles.darksearchBarContainer
              : styles.lightsearchBarContainer
          }
          onChangeText={handleQueryChange}
          placeholder="검색어를 입력하세요."
          value={searchQuery}
        />
      </View>
    </View>
  );
};

export default SearchComponent;
