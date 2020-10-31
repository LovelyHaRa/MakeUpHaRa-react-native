import React from 'react';
import { View } from 'react-native';
import { styles } from './StyleContainer';
import { SearchBar } from 'react-native-elements';

const SearchComponent = ({
  inputQuery,
  handleQueryChange,
  handleSubmit,
  colorScheme,
  placeholder = '검색어를 입력하세요',
}) => {
  return (
    <View>
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
          placeholder={placeholder}
          value={inputQuery}
        />
      </View>
    </View>
  );
};

export default SearchComponent;
