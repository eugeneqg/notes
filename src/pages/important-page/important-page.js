import "./important-page.sass";
import { Row } from "react-bootstrap";
import Note from "../../component/small-components/note/note";

const ImportantPage = ({data}) => {

    const showData = () => {

        const filtered = data.filter(note => note.important === true);
        console.log(filtered)

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
                <h1>Important</h1>
                <div className="notes-container">
                    {showData()}
                </div>
            </Row>
        </div>
    )
}

export default ImportantPage;