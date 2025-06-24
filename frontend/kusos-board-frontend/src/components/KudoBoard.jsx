import React, { useState, useEffect } from "react";
import KudoBoardCard from "./KudoBoardCard";
import SearchBox from "./SearchBox";
import CreateBoardModal from "./CreateBoardModal";
import CreateCardModal from "./CreateCardModal";
import "./Kudoboard.css";
import {
  BOARD_CATEGORIES,
  getAllCategories,
  sortBoardsByRecent,
} from "../constants/sortingEnums";


export default function KudoBoard() {
  const [kudoBoard, setKudoBoard] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [selectedBoardCards, setSelectedBoardCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(BOARD_CATEGORIES.ALL);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [cardComments, setCardComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://kudos-board-8wj6.onrender.com/api/board/all");
        const data = await response.json();
        setKudoBoard(data);
        setFilteredBoards(data);
      } catch (error) {
        alert("Failed to fetch all boards")
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterBoardsByCategory();
  }, [selectedCategory, kudoBoard]);

  const filterBoardsByCategory = () => {
    if (selectedCategory === BOARD_CATEGORIES.ALL) {
      setFilteredBoards(kudoBoard);
    } else if (selectedCategory === BOARD_CATEGORIES.RECENT) {
      // Sort by creation date (assuming newer IDs are more recent)
      const sortedBoards = sortBoardsByRecent(kudoBoard);
      setFilteredBoards(sortedBoards.slice(0, 6)); // Show 6 most recent
    } else {
      const filtered = kudoBoard.filter(
        (board) =>
          board.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredBoards(filtered);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleCreateBoard = async (formData) => {
    try {
      const response = await fetch("https://kudos-board-8wj6.onrender.com/api/board/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newBoard = await response.json();
        setKudoBoard([...kudoBoard, newBoard.board]);
      } else {
        const errorData = await response.json();
        alert("Failed to create board: " + errorData.error);
      }
    } catch (error) {
      alert("Failed to create board. Please try again.");
    }
  };

  const handleCreateCard = async (formData) => {
    if (currentBoardId) {
      try {
        const response = await fetch(
          "https://kudos-board-8wj6.onrender.com/api/board/card/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              boardId: currentBoardId,
            }),
          }
        );

        if (response.ok) {
          const newCard = await response.json();
          setSelectedBoardCards([...selectedBoardCards, newCard]);
        } else {
          const errorData = await response.json();
          alert("Failed to create card: " + errorData.error);
        }
      } catch (error) {
        alert("Failed to create card. Please try again.");
      }
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      filterBoardsByCategory();
    } else {
      const searchResults = kudoBoard.filter(
        (board) =>
          board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          board.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          board.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBoards(searchResults);
    }
  };

  const handleClearSearch = () => {
    filterBoardsByCategory();
  };

  const handleBoardClick = async (boardId) => {
    try {
      const response = await fetch(
        `https://kudos-board-8wj6.onrender.com/api/board/view/${boardId}`
      );
      const data = await response.json();
      setSelectedBoardCards(data);
      setCurrentBoardId(boardId);
      setShowCards(true);
    } catch (error) {
      alert("Failed to fetch card")
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const response = await fetch(
        `hhttps://kudos-board-8wj6.onrender.com/board/delete/${boardId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted board from the state
        setKudoBoard(kudoBoard.filter((board) => board.id !== boardId));
        // If we're currently viewing cards from the deleted board, go back to board view
        if (showCards) {
          setShowCards(false);
          setSelectedBoardCards([]);
        }
      } else {
        const errorData = await response.json();
        alert("Failed to delete board: " + errorData.error);
      }
    } catch (error) {
      alert("Failed to delete board. Please try again.");
    }
  };

  const handleBackToBoards = () => {
    setShowCards(false);
    setSelectedBoardCards([]);
  };

  const handleUpvoteCard = async (cardId) => {
    try {
      const response = await fetch(
        "https://kudos-board-8wj6.onrender.com/api/board/card/upvote",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cardId }),
        }
      );

      if (response.ok) {
        const updatedCard = await response.json();
        // Update the selectedBoardCards state with the new upvote count
        setSelectedBoardCards(
          selectedBoardCards.map((card) =>
            card.id === cardId
              ? { ...card, upvotes: updatedCard.upvotes }
              : card
          )
        );
      } else {
        const errorData = await response.json();
        alert("Failed to upvote card: " + errorData.error);
      }
    } catch (error) {
      alert("Failed to upvote card. Please try again.");
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const response = await fetch(
        "https://kudos-board-8wj6.onrender.com/api/board/card/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cardId }),
        }
      );

      if (response.ok) {
        // Remove the deleted card from the selectedBoardCards state
        setSelectedBoardCards(
          selectedBoardCards.filter((card) => card.id !== cardId)
        );
      } else {
        const errorData = await response.json();
        alert("Failed to delete card: " + errorData.error);
      }
    } catch (error) {
      alert("Failed to delete card. Please try again.");
    }
  };

  const fetchComments = async (cardId) => {
    try {
      const response = await fetch(
        `https://kudos-board-8wj6.onrender.com/board/card/comments/${cardId}`
      );
      if (response.ok) {
        const comments = await response.json();
        setCardComments((prev) => ({
          ...prev,
          [cardId]: comments,
        }));
      }
    } catch (error) {
        alert("Failed to fetch comment")
    }
  };

  const handleToggleComments = async (cardId) => {
    const isCurrentlyShowing = showComments[cardId];

    setShowComments((prev) => ({
      ...prev,
      [cardId]: !isCurrentlyShowing,
    }));

    // Fetch comments if we're showing them and haven't fetched them yet
    if (!isCurrentlyShowing && !cardComments[cardId]) {
      await fetchComments(cardId);
    }
  };

  const handleCreateComment = async (cardId) => {
    const commentData = newComment[cardId];
    if (!commentData?.message?.trim()) {
      alert("Please enter a comment message");
      return;
    }

    try {
      const response = await fetch(
        "https://kudos-board-8wj6.onrender.com/api/board/card/comment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: commentData.message,
            author: commentData.author || null,
            cardId: cardId,
          }),
        }
      );

      if (response.ok) {
        const newCommentData = await response.json();
        // Add the new comment to the existing comments
        setCardComments((prev) => ({
          ...prev,
          [cardId]: [newCommentData, ...(prev[cardId] || [])],
        }));
        // Clear the form
        setNewComment((prev) => ({
          ...prev,
          [cardId]: { message: "", author: "" },
        }));
      } else {
        const errorData = await response.json();
        alert("Failed to create comment: " + errorData.error);
      }
    } catch (error) {
      alert("Failed to create comment. Please try again.");
    }
  };

  const handleCommentInputChange = (cardId, field, value) => {
    setNewComment((prev) => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        [field]: value,
      },
    }));
  };

  return (
    <>
      {!showCards && (
        <>
          {/* Search Box - Only on boards page */}
          <SearchBox onSearch={handleSearch} onClear={handleClearSearch} />

          {/* Create New Board Button */}
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <button
              onClick={() => setShowCreateBoardModal(true)}
              className="button createBoardButton"
            >
              Create New Board
            </button>
          </div>

          {/* Category Filter Buttons */}
          <div className="kudosThemes">
            {getAllCategories().map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`button categoryButton ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </>
      )}

      {showCards && (
        <>
          {/* Create New Card Button - Only on cards page */}
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <button
              onClick={() => setShowCreateCardModal(true)}
              className="button createCardButton"
            >
              Create New Card
            </button>
          </div>

          {/* Back to Boards Button */}
          <div className="backToBoards">
            <button onClick={handleBackToBoards} className="button backButton">
              ← Back to Boards
            </button>
          </div>
        </>
      )}

      <div className="cardElement">
        {!showCards ? (
          filteredBoards.length > 0 ? (
            filteredBoards.map((boardCard, index) => (
              <KudoBoardCard
                setShowCards={setShowCards}
                showCards={showCards}
                key={index}
                image={boardCard.image}
                title={boardCard.title}
                category={boardCard.category}
                author={boardCard.author}
                onClick={() => handleBoardClick(boardCard.id)}
                onDelete={() => handleDeleteBoard(boardCard.id)}
              />
            ))
          ) : (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <h3>No boards found for "{selectedCategory}" category</h3>
              <p>Try selecting a different category or create a new board.</p>
            </div>
          )
        ) : selectedBoardCards.length > 0 ? (
          selectedBoardCards.map((card, cardIndex) => (
            <div key={cardIndex} className="cardItem">
              <img src={card.gifUrl} alt="card image" />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="cardButtons">
                <button
                  onClick={() => handleUpvoteCard(card.id)}
                  className="button upvoteButton"
                >
                  👍 Upvotes: {card.upvotes}
                </button>
                <button
                  onClick={() => handleToggleComments(card.id)}
                  className="button commentsButton"
                >
                  💬 {showComments[card.id] ? "Hide" : "Show"} Comments (
                  {cardComments[card.id]?.length || 0})
                </button>
                <button
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this card? This action cannot be undone."
                    );
                    if (confirmDelete) {
                      handleDeleteCard(card.id);
                    }
                  }}
                  className="button deleteCardButton"
                >
                  🗑️ Delete Card
                </button>
              </div>
              {/* Comments Section */}
              {showComments[card.id] && (
                <div className="commentsSection">
                  {/* Add Comment Form */}
                  <div className="addCommentForm">
                    <h4>Add a Comment</h4>
                    <textarea
                      placeholder="Enter your comment message..."
                      value={newComment[card.id]?.message || ""}
                      onChange={(comment) =>
                        handleCommentInputChange(
                          card.id,
                          "message",
                          comment.target.value
                        )
                      }
                      className="commentTextarea"
                      rows="3"
                    />
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={newComment[card.id]?.author || ""}
                      onChange={(author) =>
                        handleCommentInputChange(
                          card.id,
                          "author",
                          author.target.value
                        )
                      }
                      className="commentAuthorInput"
                    />
                    <button
                      onClick={() => handleCreateComment(card.id)}
                      className="button addCommentButton"
                    >
                      Add Comment
                    </button>
                  </div>

                  {/* Display Comments */}
                  <div className="commentsList">
                    <h4>Comments</h4>
                    {cardComments[card.id]?.length > 0 ? (
                      cardComments[card.id].map((comment, commentIndex) => (
                        <div key={commentIndex} className="commentItem">
                          <div className="commentHeader">
                            <strong>{comment.author || "Anonymous"}</strong>
                          </div>
                          <p className="commentMessage">{comment.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="noComments">
                        No comments yet. Be the first to comment!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <h3>No cards found in this board</h3>
            <p>Create a new card to get started!</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateBoardModal
        isOpen={showCreateBoardModal}
        onClose={() => setShowCreateBoardModal(false)}
        onSubmit={handleCreateBoard}
      />

      <CreateCardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        onSubmit={handleCreateCard}
      />
    </>
  );
}
