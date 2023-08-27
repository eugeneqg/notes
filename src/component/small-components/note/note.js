import "./note.sass";
import { NavLink } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

const Note = ({text, title, id, deleteNote, folder}) => {

    return (
        <div className="note">
            <NavLink className="navlink" to={"/note"} state={{title: title, text: text, id: id, folder: folder}}>
                <div style={{"width": "100%", "height": "80%"}}>
                    <h2>{title.length > 15 ? title.slice(0, 15) + "..." : title}</h2>
                    <p>{text.length > 162? text.slice(0, 162) + "..." : text}</p>
                </div>
            </NavLink>
            <Trash onClick={() => deleteNote(id)} className="trash-icon"/>
        </div>
    )
}

export default Note;