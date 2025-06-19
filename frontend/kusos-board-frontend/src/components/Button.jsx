import "./Button.css"
import PropTypes from "prop-types"



export default function Button(button) {
return (
     <>

        <button className="button" style={{backgroundColor: button.color, color : "#fff"}}>
        {button.text}

        </button>
        </>

)
}
