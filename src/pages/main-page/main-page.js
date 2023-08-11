import "./main-page.sass";
import { Row } from "react-bootstrap";
import React from "react";

const MainPage = ({data}) => {

    const showData = () => {
        if (!data.length) {
            return (
                <p>No notes</p>
            )
        } else {
            return data.map(note => {
                return (
                    <p>{note.text}</p>
                )
            })
        }
    }

    return (
        <div className="main-part">
            <Row className="">
                <h1>All notes</h1>
                {showData()}
            </Row>
        </div>
    )
}

export default MainPage;