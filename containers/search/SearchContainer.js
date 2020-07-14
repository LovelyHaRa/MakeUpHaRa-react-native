import React, { useState } from 'react';
import { useColorScheme } from 'react-native-appearance';
import SearchComponent from '../../components/search/SearchComponent';

const SearchContainer = () => {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const handleQueryChange = (search) => {
    setSearchQuery(search);
  };
  return (
    <SearchComponent
      colorScheme={colorScheme}
      searchQuery={searchQuery}
      handleQueryChange={handleQueryChange}
    />
  );
};

export default SearchContainer;
