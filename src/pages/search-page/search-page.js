import "./search-page.sass";
import { Row } from "react-bootstrap";
import React from "react";
import Note from "../../component/small-components/note/note";

const SearchPage = ({data, input, deleteNote}) => {

    const [filteredData, setFilteredData] = React.useState([]);

    React.useEffect(() => {

        (async () => {

            if (input.length !== 0) {
                const newData = [...data]
                const filtered = await newData.filter(note => note.text.toLowerCase().includes(input.toLowerCase()) || note.title.toLowerCase().includes(input.toLowerCase()));
                await setFilteredData(filtered);
            }
        })();

    }, [data, input]);

    const showData = () => {

        if (!filteredData.length) {
            return (
                <p>No notes</p>
            )
        } else {
            return filteredData.map(note => {
                return (
                    <Note title={note.title} key={note.id} text={note.text} deleteNote={deleteNote}/>
                )
            })
        }
    }

    return (
        <div className="main-part">
            <Row >
                <h1 className="margin-h1">Search</h1>
                <div className="notes-container">
                    {showData()}
                </div>
            </Row>
        </div>
    )
}

export default SearchPage;