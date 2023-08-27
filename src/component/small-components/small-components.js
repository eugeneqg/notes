import "./small-components.sass";
import { Plus, Trash } from "react-bootstrap-icons";
import React from "react";

const MenuButton = ({name, custom, id, deleteFolder}) => {
    return (
        <button className="menu-button">
            {name.length < 14 ? name : name.slice(0, 13) + "..."}
            {custom ? <Trash className="trash-btn" onClick={() => deleteFolder(id)}/> : null}
        </button>
    )
}

const CreateButton = ({fab, func, name, isDisabled, bgColor, textColor}) => {

    return (
        <button style={{backgroundColor: `${bgColor}`, color: `${textColor}`}} onClick={func} className="create-button" disabled={isDisabled}>{name}</button>
    )
}

const Fab = ({fab, func, name}) => {

    return (
        <button onClick={func} className="fab"><Plus className="plus" size={40}/><p>{name}</p></button>
    )
}

export {MenuButton, CreateButton, Fab};