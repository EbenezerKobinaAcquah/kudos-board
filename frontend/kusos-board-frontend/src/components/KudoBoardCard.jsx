
import "./KudoBoardCard.css"
import Button from "./Button"
export default function KudoBoardCard(cardDetails){
    return (
        <>
            <div className="kudoBoardCard">
                <img src={cardDetails.image} alt="kudo card image" className="kudoCardImg"></img>
                <h3>{cardDetails.title}</h3>
                <p>{cardDetails.category}</p>
                <p>{cardDetails.author}</p>
                <div className="kudoCardButtons">
                <Button text = "View Board"/>
                <Button text = "Delete Board" color = "green"/>
                </div>
            </div>
        </>
    )
}
