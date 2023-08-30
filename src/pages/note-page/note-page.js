import React from 'react';
import {useLocation} from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { Trash } from "react-bootstrap-icons";
import { TextButton } from '../../component/small-components/small-components';
import "./note-page.sass";

const NotePage = ({updateNote, deleteNote, userFolders, areFoldersLoaded}) => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const [text, setText] = React.useState(state.text);
    const [title, setTitle] = React.useState(state.title);
    const [folder, setFolder] = React.useState(state.folder);

    const update = async (e) => {
        e.preventDefault();
        if (e.target.classList.contains("input-h1")) {
            await setTitle(e.target.value);
            updateNote(state.id, e.target.value, text, folder, state.important, state.deleted);

        } else {
            await setText(e.target.value);
            updateNote(state.id, title, e.target.value, folder, state.important, state.deleted);
        }
    }

    

    const updateImportant = async (e) => {

        updateNote(state.id, title, text, folder, !state.important, state.deleted);
    }

    const handler = async (e) => {
        
        if (!state.deleted) {
            if (window.confirm("Are you sure you want to delete this note?")) {
            updateNote(state.id, title, text, folder, state.important, !state.deleted);
            navigate("/all");
            }
        } else {
            await deleteNote(state.id);
            navigate("/all");
        }
    }

    const resizeTextarea = () => {
        const textarea = document.querySelector('.input-p');
        textarea.style.height = '20px';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    const getFolders = () => {
        if (!areFoldersLoaded) {
            return <p>loading</p>
        } else {
            return <select name="folders" id="folders" onChange={updateFolder}>
                <option value="" selected={folder === "" ? "selected" : null}>No folder</option>
                {userFolders.map(folder => {
                    return <option selected={folder.name === state.folder ? "selected" : null } value={folder.name}>{folder.name}</option>
                })};
            </select>
        }
    }

    const updateFolder = async (e) => {
        await updateNote(state.id, title, text, e.target.value, state.important, state.deleted);
    }

    React.useEffect(() => {
        resizeTextarea()
    }, []);

    return (
        <div className="main-part">
            <Row>
                <div className=''>
                    <div className='note-title d-flex gap-2'>
                        <ArrowLeft onClick={() => navigate(-1)} size={40} color='#3884AE'/>
                        <input className='input-h1' onChange={update} value={title}></input>
                    </div>
                    <div className='note-text'>
                        <textarea className='input-p' onChange={update} value={text}></textarea>
                    </div>
                    <div className='tools'>
                        <div className='right-tools'>
                            <div className='folder-selector'>
                                {getFolders()}
                            </div>
                            <div className='is-important-box'>
                                <input defaultChecked={state.important} onChange={updateImportant} id="checkbox" type="checkbox"></input>
                                <label for="checkbox">Important</label>
                            </div>
                        </div>
                        <TextButton func={handler} text={"Delete this note"} />
                    </div>
                </div>
            </Row>
        </div>
    )

}
export default NotePage;