import "./small-components.sass";

const MenuButton = ({name}) => {
    return (
        <button className="menu-button">{name}</button>
    )
}

const CreateButton = ({func, name}) => {

    return (
        <button onClick={func} className="create-button">{name}</button>
    )
}

export {MenuButton, CreateButton};