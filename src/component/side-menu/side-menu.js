import { CreateButton, MenuButton } from "../small-components/small-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { logout } from "../../firebase";
import "./side-menu.sass";
import React from "react";

const SideMenu = ({setModalOpen, setData}) => {

    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const handler = () => {
        setModalOpen(true);
    }

    const logOut = () => {
        setData([])
        logout();
    }

    React.useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div className="side-menu">
            <h3>LOGO</h3>
            <p onClick={logOut}>logout</p>
            <div className="buttons">
                <div className="menu-buttons">
                    <NavLink to={"/all"}><MenuButton name={"All notes"}/></NavLink>
                    <NavLink to={"/important"}><MenuButton name={"Important"}/></NavLink>
                    <NavLink to={"/deleted"}><MenuButton name={"Recently deleted"}/></NavLink>
                </div>
                    <CreateButton func={handler} name={"New note"}/>
            </div>
        </div>
    )
}

export default SideMenu;