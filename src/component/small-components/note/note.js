import "./note.sass";
import { NavLink } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Note = ({text, title, id, deleteNote, folder, important, updateNote, deleted}) => {

    const navigate = useNavigate();

    const handler = async (e) => {
        
        if (!deleted) {
            if (window.confirm("Are you sure you want to delete this note?")) {
            updateNote(id, title, text, folder, important, !deleted);
            navigate("/all");
            }
        } else {
            await deleteNote(id);
        }
    }

    return (
        <div className="note">
            <NavLink className="navlink" to={`/note/${id}`} state={{title: title, text: text, id: id, folder: folder, important: important, deleted: deleted}}>
                <div style={{"width": "100%", "height": "80%"}}>
                    <h2>{title.length > 15 ? title.slice(0, 15) + "..." : title}</h2>
                    <p>{text.length > 162? text.slice(0, 162) + "..." : text}</p>
                </div>
            </NavLink>
            <Trash onClick={handler} className="trash-icon"/>
        </div>
    )
}

export default Note;