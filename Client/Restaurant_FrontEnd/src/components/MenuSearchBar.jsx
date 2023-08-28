import React, { useState } from 'react';

const MenuSearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
   setSearchQuery( event.target.value);
   onSearch(value);
  };

  return (<>
 
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search menu items..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
    </>
  );
};

export default MenuSearchBar;
