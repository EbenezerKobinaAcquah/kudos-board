import "./Button.css";

export default function ViewBoardButton({ showCards, setShowCards, onClick }) {
  const handleViewBoardCards = () => {
    if (onClick) {
      onClick(); // This will fetch the board data and set showCards to true
    } else {
      setShowCards(!showCards);
    }
  };

  return (
    <>
      <button onClick={handleViewBoardCards} className="button viewButton">
        View Board
      </button>
    </>
  );
}
