import "./folder-page.sass";
import React from "react";
import { Row } from "react-bootstrap";
import Note from "../../component/small-components/note/note";
import {NavLink, useLocation} from 'react-router-dom'

const FolderPage = ({folderData, data, setPage}) => {

    React.useEffect(() => {
        setPage(folderData.name);

        console.log(data)
    }, [])

    const showData = () => {

        const filtered = data.filter(note => note.folder === folderData.name);

        if (!filtered.length) {
            return (
                <p>No notes</p>
            )
        } else {
            return filtered.map(note => {
                return (
                    <Note title={note.title} text={note.text}/>
                )
            })
        }
    }

    return (
        <div className="main-part">
            <Row >
                <h1>{folderData.name}</h1>
                <div className="notes-container">
                    {showData()}
                </div>
            </Row>
        </div>
    )
}

export default FolderPage;