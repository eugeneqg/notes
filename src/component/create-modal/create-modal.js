import { CreateButton } from "../small-components/small-components";
import "./create-modal.sass";
import { XLg } from "react-bootstrap-icons";
import { collection, doc, addDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../firebase";
import React from "react";
import { auth } from "../../firebase";

const CreateModal = ({setModalOpen}) => {

    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");
    const [isImportant, setImportant] = React.useState(false);
    const [user] = useAuthState(auth);

    const handler = (e) => {
        setModalOpen(false);
        addNote(e)
    }

    console.log(isImportant)

    const addNote = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "notes"), {
                uid: user.uid,
                noteId: Date.now(),
                title: title,
                text: text,
                important: isImportant,
                createdAt: Timestamp.fromDate(new Date()),
            })
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return (
        <div className="modal-background">
            <div className="create-modal">
                <XLg onClick={handler} size={20} className="close-button"/>
                <h1>Create a new note</h1>
                <input onChange={(e) => setTitle(e.target.value)} className="create-input title-input" type="text" placeholder="Note title"></input>
                <textarea onChange={(e) => setText(e.target.value)} className="create-input" placeholder="Note text"></textarea>
                <input onChange={() => setImportant(true)} id="checkbox" type="checkbox"></input><label for="checkbox">This note is important</label>
                <CreateButton func={handler} name={"Create new note"}/>
            </div>
        </div>
    )
}

export default CreateModal;

