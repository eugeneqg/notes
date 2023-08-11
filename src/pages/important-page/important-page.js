import "./important-page.sass";
import { Row } from "react-bootstrap";

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
                    <p>{note.text}</p>
                )
            })
        }
    }

    return (
        <div className="main-part">
            <Row className="">
                <h1>Important</h1>
                {showData()}
            </Row>
        </div>
    )
}

export default ImportantPage;