import React, { useContext } from 'react';
import { ImageContext } from '../../context/ImageContex';
import "./styles.css"

function SearchBar() {
  const { filter, setFilter } = useContext(ImageContext);

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by tag"
      value={filter}
      onChange={handleSearch}
    />
  );
}

export default SearchBar;