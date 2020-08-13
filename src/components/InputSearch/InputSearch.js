import React from 'react';

import './InputSearch.css';

const InputSearch = ({ inputValue, update, announcementsArray }) => {

  const inputValueChange = e => {
    const value = e.target.value.toLowerCase();

    const filter = announcementsArray.filter(announcement => {
      const title = announcement.title.toLowerCase().split(' ');

      return title.find(str => str.startsWith(value));
    });

    update({
      announcementsArray: filter,
      inputValue: value
    });
  };

  return (
    <div className="search-form">
      <input type="text"
             placeholder="Search..."
             value={inputValue}
             onChange={inputValueChange}
             className="search-input" />
    </div>
  );
};

export default InputSearch;
