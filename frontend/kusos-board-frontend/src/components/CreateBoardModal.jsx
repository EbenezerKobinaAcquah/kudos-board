import React, { useState } from "react";
import {
  SELECTABLE_BOARD_CATEGORIES,
  getSelectableCategories,
} from "../constants/sortingEnums";
import "./Modal.css";

export default function CreateBoardModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    category: SELECTABLE_BOARD_CATEGORIES.CELEBRATION,
    author: "",
  });

  const handleChange = (form) => {
    setFormData({
      ...formData,
      [form.target.name]: form.target.value,
    });
  };

  const handleSubmit = (submit) => {
    submit.preventDefault();
    if (formData.title && formData.category) {
      onSubmit({
        ...formData,
        author: formData.author || "Anonymous",
      });
      setFormData({
        title: "",
        category: SELECTABLE_BOARD_CATEGORIES.CELEBRATION,
        author: "",
      });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      category: SELECTABLE_BOARD_CATEGORIES.CELEBRATION,
      author: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={handleClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2>Create New Board</h2>
          <button className="modalClose" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modalForm">
          <div className="formGroup">
            <label htmlFor="title">Board Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter board title"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {getSelectableCategories().map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="author">Your Name (Optional)</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="modalActions">
            <button type="button" onClick={handleClose} className="btnCancel">
              Cancel
            </button>
            <button type="submit" className="btnSubmit">
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
