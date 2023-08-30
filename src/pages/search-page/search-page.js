import "./search-page.sass";
import { Row, Spinner } from "react-bootstrap";
import React from "react";
import Note from "../../component/small-components/note/note";

const SearchPage = ({data, input}) => {

    const [filteredData, setFilteredData] = React.useState([]);

    React.useEffect(() => {

        (async () => {

            if (input.current.length !== 0) {
                const filtered = await data.filter(note => note.text.toLowerCase().includes(input.current.toLowerCase()) || note.title.toLowerCase().includes(input.current.toLowerCase()));
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
                    <Note title={note.title} key={note.id} text={note.text}/>
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