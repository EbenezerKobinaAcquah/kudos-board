import "./Button.css";

export default function DeleteBoardButton({ onClick }) {
  const handleDeleteBoard = () => {
    if (onClick) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this board? This action cannot be undone."
      );
      if (confirmDelete) {
        onClick();
      }
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteBoard}
        className="button deleteButton"
        style={{ backgroundColor: "#dc3545", color: "white" }}
      >
        Delete Board
      </button>
    </>
  );
}
