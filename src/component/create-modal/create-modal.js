import { CreateButton } from "../small-components/small-components";
import "./create-modal.sass";
import { XLg } from "react-bootstrap-icons";
import { collection, doc, addDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../firebase";
import React from "react";
import { auth } from "../../firebase";

const CreateModal = ({setModalOpen, page}) => {

    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [isImportant, setImportant] = React.useState(false);
    const [user] = useAuthState(auth);

    const handler = (e) => {
        setModalOpen(false);
        addNote(e)
    }

    const addNote = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "notes"), {
                uid: user.uid,
                title: title,
                text: text,
                important: isImportant,
                folder: page,
                createdAt: Timestamp.fromDate(new Date()),
            })
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    React.useEffect(() => {
        if (text && title) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

    }, [isDisabled, text, title])

    return (
        <div className="modal-background">
            <div className="create-modal">
                <XLg onClick={handler} size={20} className="close-button"/>
                <h1>Create a new note</h1>
                <input onChange={(e) => setTitle(e.target.value)} className="create-input title-input" type="text" placeholder="Note title"></input>
                <textarea onChange={(e) => setText(e.target.value)} className="create-input" placeholder="Note text"></textarea>
                <input onChange={() => setImportant(true)} id="checkbox" type="checkbox"></input><label for="checkbox">This note is important</label>
                <CreateButton func={handler} isDisabled={isDisabled} name={"Create new note"}/>
            </div>
        </div>
    )
}

export default CreateModal;

