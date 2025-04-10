import { Select } from 'antd';
import { memo } from 'react';

import Search from 'antd/lib/input/Search';
import debounce from 'lodash.debounce';

const SearchInput: React.FC<{
  placeholder: string;
  handleSearchValue: (value: string) => void;
}> = ({ placeholder, handleSearchValue }) => {
  const handleSearch = (newValue: string) => {
    handleSearchValue(newValue);
  };
  const debouncedSearch = debounce((query: string) => {
    handleSearch(query);
  }, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    debouncedSearch(query);
  };

  return (
    <Search
      className="w-full "
      // size="large"
      placeholder={placeholder}
      onSearch={handleSearch}
      allowClear={true}
      onChange={(event) => handleInputChange(event)}
    />
  );
};
export default memo(SearchInput);
