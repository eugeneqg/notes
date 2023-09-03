import { CreateButton } from "../small-components/small-components";
import "./create-modal.sass";
import { XLg } from "react-bootstrap-icons";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../firebase";
import React from "react";
import { auth } from "../../firebase";

const CreateModal = ({isModalOpen, setModalOpen, page, userFolders, setPage}) => {

    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [isImportant, setImportant] = React.useState(false);
    const [folder, setFolder] = React.useState(page);
    const [user] = useAuthState(auth);

    const ref = React.useRef();

    const handler = (e) => {
        setModalOpen(false);
        addNote(e);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const addNote = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "notes"), {
                uid: user.uid,
                title: title,
                text: text,
                important: isImportant,
                folder: page ? page : folder,
                deleted: false,
                createdAt: Timestamp.fromDate(new Date()),
            });
            setPage("");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const showFolders = () => {
        if (userFolders.length !== 0) {
            return (
                <select onChange={(e) => setFolder(e.target.value)}>
                    <option value="">Not selected</option>
                    {userFolders.map(folder => {
                        return <option selected={folder.name === page ? "selected" : null } value={folder.name}>{folder.name}</option>
                    })}
                </select>
            )
        } else {
            return (
                <select>
                    <option value="">Not selected</option>
                </select>
            )
        }
    }

    React.useEffect(() => {
        if (text && title) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                closeModal();
            }
        }
    
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick);

         
   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDisabled, text, title, isModalOpen]);

    return (
        <div className="modal-background">
            <div ref={ref} className="create-modal">
                <XLg onClick={closeModal} size={20} className="close-button"/>
                <h1>Create a new note</h1>
                <input onChange={(e) => setTitle(e.target.value)} className="create-input title-input" type="text" placeholder="Note title"></input>
                <textarea onChange={(e) => setText(e.target.value)} className="create-input create-textarea" placeholder="Note text"></textarea>
                <div className="tools">
                    <div className='is-important-box'>
                        <input onChange={() => setImportant(true)} id="checkbox" type="checkbox"></input>
                        <label for="checkbox">Important</label>
                    </div>
                    <div className='folder-selector'>{showFolders()}</div>
                </div>
                <CreateButton func={handler} isDisabled={isDisabled} name={"Create new note"}/>
            </div>
        </div>
    )
}

export default CreateModal;

