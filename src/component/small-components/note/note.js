import "./note.sass";
import { NavLink } from "react-router-dom";

const Note = ({text, title}) => {

    return (
        <NavLink className="navlink" to={"/note"} state={{title: title, text: text}}>
            <div className="note">
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </NavLink>
    )
}

export default Note;