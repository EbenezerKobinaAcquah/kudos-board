import React, {useState, useEffect} from 'react'
import KudoBoardCard from './KudoBoardCard';
import Button from './Button';


export default function KudoBoard() {
    const [kudoBoard, setKudoBoard] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/boards');
                    const data = await response.json();
                    setKudoBoard(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, []);
const displayBoardCards = () => {
    console.log("Displaying all cards");
}

    return (
        <>

        <div className='kudosThemes'>
        <Button onClick = {displayBoardCards} text = "All" color = "gray"/>
        <Button text = "Recent" color = "gray"/>
        <Button text = "Celebration" color = "gray"/>
        <Button text = "Thank You" color = "gray"/>
        <Button text = "Inspiration" color = "gray"/>
              </div>

{kudoBoard.map((boardCard, index) => {
    return (
    <KudoBoardCard image={boardCard.image} title = {boardCard.title} category = {boardCard.category} author = {boardCard.author} />
    )
})}
        </>
    )
}
