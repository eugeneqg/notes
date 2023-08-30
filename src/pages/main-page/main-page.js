import "./main-page.sass";
import { Row } from "react-bootstrap";
import React from "react";
import Note from "../../component/small-components/note/note";
import Loader from "../../component/small-components/loader/loader";

const MainPage = ({data, isDataLoaded, updateNote, deleteNote, updatedNotes, setUpdatedNotes, setPage}) => {

    const [filteredData, setFilteredData] = React.useState([]);

    React.useEffect(() => {
        setPage("");
        (async () => {
            const filtered = data.filter(note => note.deleted !== true);
            setFilteredData(filtered);
        })()
    }, [setPage, data]);

    const showData = () => {
        if (!isDataLoaded) {
            return (
                <Loader />
            )

        } else if (filteredData.length !== 0) {
            return (
                <div className="notes-container">
                    {
                        filteredData.map(note => {
                            return (
                                <Note key={note.noteId} title={note.title} text={note.text} id={note.noteId} folder={note.folder} deleteNote={deleteNote} important={note.important} updateNote={updateNote} deleted={note.deleted}/>
                            )
                        })
                    }
                </div>
                )

        } else {
            return (
                <p>No notes</p>
            )
        }
    }

    return (
        <div className="main-part">
            <Row>
                <h1 className="margin-h1">All notes</h1>
                {showData()}
            </Row>
        </div>
    )
}

export default MainPage;