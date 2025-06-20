import "./KudoBoardCard.css";
import ViewBoardButton from "./ViewBoardButton";
import DeleteBoardButton from "./DeleteBoardButton";
export default function KudoBoardCard({
  image,
  title,
  category,
  author,
  showCards,
  setShowCards,
  onClick,
  onDelete,
}) {
  return (
    <>
      <div className="kudoBoardCard">
        <img src={image} alt="kudo card image" className="kudoCardImg"></img>
        <h3>{title}</h3>
        <p>{category}</p>
        <p>{author}</p>
        <div className="kudoCardButtons">
          <ViewBoardButton
            setShowCards={setShowCards}
            showCards={showCards}
            onClick={onClick}
            text="View Board"
            color="gray"
          />
          <DeleteBoardButton onClick={onDelete} />
        </div>
      </div>
    </>
  );
}
