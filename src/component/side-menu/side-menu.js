import { CreateButton, MenuButton } from "../small-components/small-components";
import { NavLink } from "react-router-dom";
import "./side-menu.sass";

const SideMenu = ({setModalOpen}) => {

    const handler = () => {
        setModalOpen(true);
    }

    return (
        <div className="side-menu">
            <h3>LOGO</h3>
            <div className="buttons">
                <div className="menu-buttons">
                    <NavLink to={"/"}><MenuButton name={"All notes"}/></NavLink>
                    <NavLink to={"important"}><MenuButton name={"Important"}/></NavLink>
                    <NavLink to={"deleted"}><MenuButton name={"Recently deleted"}/></NavLink>
                </div>
                    <CreateButton func={handler} name={"New note"}/>
            </div>
        </div>
    )
}

export default SideMenu;