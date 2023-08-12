import "./main-page.sass";
import { Row } from "react-bootstrap";
import React from "react";
import Note from "../../component/small-components/note/note";
import Loader from "../../component/small-components/loader/loader";

const MainPage = ({data, isDataLoaded}) => {

    const showData = () => {
        if (!isDataLoaded) {
            return (
                <Loader />
            )

        } else if (data.length !== 0) {
            return (
                <div className="notes-container">
                    {
                        data.map(note => {
                            return (
                                <Note title={note.title} text={note.text}/>
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