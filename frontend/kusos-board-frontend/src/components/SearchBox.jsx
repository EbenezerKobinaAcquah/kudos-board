import './SearchBox.css';
import Button from './Button';

export default function SearchBox() {
    return (
        <>
        <div className="searchBar">
            <input type="text" placeholder="Search boards..." className='searchBox'></input>
            <Button text="Search"  color = "green" />
            <Button text="Clear" color = "green"/>
            </div>
        </>
    )
}
