import "./folder-page.sass";
import React from "react";
import { Row } from "react-bootstrap";
import Note from "../../component/small-components/note/note";

const FolderPage = ({folderData, data, setPage, deleteNote}) => {

    const [filteredData, setFilteredData] = React.useState([]);

    React.useEffect(() => {
        setPage(folderData.name);

        (async () => {
            const filtered = await data.filter(note => note.important === true);
            setFilteredData(filtered)
            })()
    }, [data])

    const showData = () => {

        const filteredData = data.filter(note => note.folder === folderData.name);

        if (!filteredData.length) {
            return (
                <p>No notes</p>
            )
        } else {
            return filteredData.map(note => {
                return (
                    <Note key={note.noteId} title={note.title} text={note.text} id={note.noteId} folder={note.folder} deleteNote={deleteNote}/>
                )
            })
        }
    }

    return (
        <div className="main-part">
            <Row >
                <h1 className="margin-h1">{folderData.name}</h1>
                <div className="notes-container">
                    {showData()}
                </div>
            </Row>
        </div>
    )
}

export default FolderPage;