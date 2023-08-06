import { CreateButton } from "../small-components/small-components";
import "./create-modal.sass";
import { XLg } from "react-bootstrap-icons";

const CreateModal = ({setModalOpen}) => {

    const handler = () => {
        setModalOpen(false);
    }

    return (
        <div className="modal-background">
            <div className="create-modal">
                <XLg onClick={handler} size={20} className="close-button"/>
                <h1>Create a new note</h1>
                <input className="create-input title-input" type="text" placeholder="Note title"></input>
                <textarea className="create-input" placeholder="Note text"></textarea>
                <input type="checkbox"></input>This note is important
                <CreateButton func={handler} name={"Create new note"}/>
            </div>
        </div>
    )
}

export default CreateModal;