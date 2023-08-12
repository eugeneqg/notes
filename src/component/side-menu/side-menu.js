import { CreateButton, MenuButton } from "../small-components/small-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { logout } from "../../firebase";
import "./side-menu.sass";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const SideMenu = ({setModalOpen, setData, userFolders}) => {

    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const logOut = () => {
        setData([])
        logout();
        navigate("/")
    }

    React.useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user, navigate, userFolders]);
    
    const addNewFolder = async () => {
        let value = "";
        const div = document.querySelector(".menu-buttons");
        const newFolder = document.createElement(`div`);
        newFolder.classList.add("new-folder");
        newFolder.innerHTML = `
            <input class="folder-input" type="text" value=${value}></input>
            <button class="folder-button">Ok</button>
        `
        div.appendChild(newFolder);

        document.querySelector(".folder-input").addEventListener("change", e => {
            value = e.target.value;
        });
        document.querySelector(".folder-button").addEventListener("click", e => {
            e.preventDefault();
            addNote(e, value);
            div.removeChild(newFolder);
        });

    }

    const addNote = async (e, value) => {

        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "folders"), {
                uid: user.uid,
                name: value
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return (
        <div className="side-menu">
            <h3>LOGO</h3>
            <p onClick={logOut}>logout</p>
            <div className="buttons">
                <div className="menu-buttons">
                    <NavLink to={"/all"}><MenuButton name={"All notes"}/></NavLink>
                    <NavLink to={"/important"}><MenuButton name={"Important"}/></NavLink>
                    <NavLink to={"/deleted"}><MenuButton name={"Recently deleted"}/></NavLink>
                    {userFolders?.map(folder => {
                        return (
                            <NavLink to={`/${folder.name}`} state={folder}><MenuButton name={folder.name}/></NavLink>
                        )
                    })}
                </div>
                    <CreateButton name={"New folder"} func={addNewFolder}/>
                    {/* <CreateButton func={handler} /> */}
            </div>
        </div>
    )
}

export default SideMenu;