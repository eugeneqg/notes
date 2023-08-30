import "./recently-deleted-page.sass";
import { Row } from "react-bootstrap";
import React from "react";
import Note from "../../component/small-components/note/note";

const RecentlyDeleted = ({data, deleteNote}) => {

    const [filteredData, setFilteredData] = React.useState([]);

    React.useEffect(() => {

        (async () => {
            const filtered = data.filter(note => note.deleted === true);
            setFilteredData(filtered);
        })()

    }, [data]);

    const showData = () => {

        if (!filteredData.length) {
            return (
                <p>No notes</p>
            )
        } else {
            return filteredData.map(note => {
                return (
                    <Note title={note.title} key={note.id} text={note.text} important={note.important} id={note.noteId} deleteNote={deleteNote} deleted={note.deleted}/>
                )
            })
        }
    }

    return (
        <div className="main-part">
            <Row >
                <h1 className="margin-h1">Recently Deleted</h1>
                <div className="notes-container">
                    {showData()}
                </div>
            </Row>
        </div>
    )
}

export default RecentlyDeleted;