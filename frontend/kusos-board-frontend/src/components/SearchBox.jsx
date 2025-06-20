import React, { useState } from "react";
import "./SearchBox.css";
import "./Button.css"

export default function SearchBox({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
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
