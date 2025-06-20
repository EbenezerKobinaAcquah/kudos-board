import React, { useState } from "react";
import "./Modal.css";

export default function CreateCardModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    gifUrl: "",
  });

  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showGifSearch, setShowGifSearch] = useState(true);
  const [selectedGif, setSelectedGif] = useState(null);

  // Giphy API key (you should use environment variable in production)
  const GIPHY_API_KEY = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65"; // Public demo key

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const searchGifs = async () => {
    if (!gifSearch.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
          gifSearch
        )}&limit=12&rating=g`
      );
      const data = await response.json();
      setGifResults(data.data || []);
    } catch (error) {
      alert("Failed to search GIFs. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const selectGif = (gif) => {
    setSelectedGif(gif);
    setFormData({
      ...formData,
      gifUrl: gif.images.original.url,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.gifUrl) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ title: "", description: "", gifUrl: "" });
    setGifSearch("");
    setGifResults([]);
    setSelectedGif(null);
    setShowGifSearch(true);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchGifs();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={handleClose}>
      <div
        className="modalContent gifModal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalHeader">
          <h2>Create New Card</h2>
          <button className="modalClose" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modalForm">
          <div className="formGroup">
            <label htmlFor="title">Card Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter card title"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter card description"
              rows="4"
              required
            />
          </div>

          <div className="formGroup">
            <div className="gifInputToggle">
              <button
                type="button"
                onClick={() => setShowGifSearch(true)}
                className={`toggleBtn ${showGifSearch ? "active" : ""}`}
              >
                🔍 Search GIFs
              </button>
              <button
                type="button"
                onClick={() => setShowGifSearch(false)}
                className={`toggleBtn ${!showGifSearch ? "active" : ""}`}
              >
                🔗 Enter URL
              </button>
            </div>

            {showGifSearch ? (
              <>
                <label>Search for GIFs *</label>
                <div className="gifSearchContainer">
                  <input
                    type="text"
                    value={gifSearch}
                    onChange={(e) => setGifSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for GIFs (e.g., celebration, thank you)"
                    className="gifSearchInput"
                  />
                  <button
                    type="button"
                    onClick={searchGifs}
                    disabled={isSearching || !gifSearch.trim()}
                    className="gifSearchBtn"
                  >
                    {isSearching ? "Searching..." : "Search"}
                  </button>
                </div>

                {selectedGif && (
                  <div className="selectedGif">
                    <p>Selected GIF:</p>
                    <img
                      src={selectedGif.images.fixed_height_small.url}
                      alt="Selected GIF"
                      className="selectedGifPreview"
                    />
                  </div>
                )}

                {gifResults.length > 0 && (
                  <div className="gifResults">
                    <p>Click on a GIF to select it:</p>
                    <div className="gifGrid">
                      {gifResults.map((gif) => (
                        <div
                          key={gif.id}
                          className={`gifItem ${
                            selectedGif?.id === gif.id ? "selected" : ""
                          }`}
                          onClick={() => selectGif(gif)}
                        >
                          <img
                            src={gif.images.fixed_height_small.url}
                            alt={gif.title}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <label htmlFor="gifUrl">GIF URL *</label>
                <input
                  type="url"
                  id="gifUrl"
                  name="gifUrl"
                  value={formData.gifUrl}
                  onChange={handleChange}
                  placeholder="Enter GIF URL (e.g., https://example.com/image.gif)"
                  required
                />
              </>
            )}
          </div>

          <div className="modalActions">
            <button type="button" onClick={handleClose} className="btnCancel">
              Cancel
            </button>
            <button
              type="submit"
              className="btnSubmit"
              disabled={
                !formData.title || !formData.description || !formData.gifUrl
              }
            >
              Create Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
