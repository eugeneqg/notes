import React from 'react';
import {useLocation} from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { Trash } from "react-bootstrap-icons";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateState } from '../../redux/note-slice';
import Loader from '../../component/small-components/loader/loader';
import "./note-page.sass";

const NotePage = ({updateNote, deleteNote, userFolders, areFoldersLoaded, updatedComponent, setUpdatedComponent, data}) => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const noteData = useSelector(state => state.noteData.note);
    const [text, setText] = React.useState(noteData.text);
    const [title, setTitle] = React.useState(noteData.title);
    const {id} = useParams();
    const dispatch = useDispatch();

    const handleBlur = () => {
        const title = document.querySelector(".input-h1").textContent;
        const text = document.querySelector(".input-p").textContent;
        updateNote(id, title, text, noteData.folder, noteData.important, noteData.deleted);
        setText(title);
        setText(text);
    }

    const updateImportant = async (e) => {
        updateNote(state.id, title, text, noteData.folder, !noteData.important, noteData.deleted);
    }

    const handler = async (e) => {
        
        if (!state.deleted) {
            if (window.confirm("Are you sure you want to delete this note?")) {
            updateNote(id, title, text, noteData.folder, noteData.important, !noteData.deleted);
            navigate("/all");
            }
        } else {
            await deleteNote(id);
            navigate(-1);
        }
    }

    const getFolders = () => {
        if (!areFoldersLoaded) {
            return (
                <select value="" name="folders" id="folders" onChange={updateFolder}>
                    <option value="">No folder</option>
                </select>
            )
        } else {
            return (
            <select value={noteData.folder} name="folders" id="folders" onChange={updateFolder}>
                <option value="" selected={noteData.folder === "" ? "selected" : null}>No folder</option>
                {userFolders.map(folder => {
                    return <option  key={folder.name} value={folder.name}>{folder.name}</option>
                })};
            </select>
            )
        }
    }

    const updateFolder = async (e) => {
        await updateNote(state.id, title, text, e.target.value, state.important, state.deleted);
    }

    React.useEffect(() => {

        if (data.length !== 0) {
            const [note] = data.filter(note => note.noteId === id);
            delete note.createdAt;
            dispatch(updateState(note));
            setText(noteData.text);
            setTitle(noteData.title)
        }

    }, [data, id, dispatch, noteData]);

    return (
        <div className="main-part">
            <Row>
                {title === "" && text === "" ? <Loader /> 
                :
                <div className=''>
                    <div className='note-title d-flex gap-2'>
                        <ArrowLeft onClick={() => navigate(-1)} size={40} color='#3884AE'/>
                        <h1 contentEditable suppressContentEditableWarning={true} className='input-h1' onBlur={handleBlur}>{title}</h1>
                    </div>
                    <div className='note-text'>
                        <p contentEditable suppressContentEditableWarning={true} className='input-p' onBlur={handleBlur}>{text}</p>
                    </div>
                    <div className='tools'>
                        <div className='right-tools'>
                            <div className='folder-selector'>
                                {getFolders()}
                            </div>
                            <div className='is-important-box'>
                                <input defaultChecked={noteData.important} onChange={updateImportant} id="checkbox" type="checkbox"></input>
                                <label htmlFor="checkbox">Important</label>
                            </div>
                        </div>
                        <button className='delete-button' onSubmit={handler} onClick={handler}>{window.innerWidth > 430 ? <p><Trash />  Delete</p> : <Trash color='white' /> }</button>
                    </div>
                </div>
                }
            </Row>
        </div>
    )

}
export default NotePage;