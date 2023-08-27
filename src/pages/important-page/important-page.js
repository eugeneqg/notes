import "./important-page.sass";
import { Row } from "react-bootstrap";
import React from "react";
import Note from "../../component/small-components/note/note";

const ImportantPage = ({data}) => {

    const [filteredData, setFilteredData] = React.useState([]);

    React.useEffect(() => {

        (async () => {
            const filtered = data.filter(note => note.important === true);
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
                    <Note title={note.title} key={note.id} text={note.text}/>
                )
            })
        }
    }

    return (
        <div className="main-part">
            <Row >
                <h1 className="margin-h1">Important</h1>
                <div className="notes-container">
                    {showData()}
                </div>
            </Row>
        </div>
    )
}

export default ImportantPage;