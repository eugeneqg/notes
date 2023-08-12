import "./small-components.sass";
import { Plus } from "react-bootstrap-icons";
import React from "react";

const MenuButton = ({name}) => {
    return (
        <button className="menu-button">{name}</button>
    )
}

const CreateButton = ({fab, func, name, isDisabled}) => {

    return (
        <button onClick={func} className="create-button" disabled={isDisabled}>{name}</button>
    )
}

const Fab = ({fab, func, name}) => {

    return (
        <button onClick={func} className="fab"><Plus className="plus" size={40}/><p>{name}</p></button>
    )
}

export {MenuButton, CreateButton, Fab};