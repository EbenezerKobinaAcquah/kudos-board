import React, { useState } from "react";
import "./SearchBox.css";
import "./Button.css"

export default function SearchBox({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (textBoxText) => {
    setSearchTerm(textBoxText.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear();
  };

  const handleKeyDown = (enter) => {
    if (enter.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search boards..."
          className="searchBox"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="button greenButton" onClick={handleSearch}>Search</button>
        <button className="button deleteButton" onClick={handleClear}>Clear</button>
      </div>
    </>
  );
}
