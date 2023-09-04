import { MenuButton } from "../small-components/small-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import "./side-menu.sass";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../small-components/loader/loader";

const SideMenu = ({setData, userFolders, updatedFolders, setUpdatedFolders, logOut, deleteFolder, areFoldersLoaded, width}) => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    React.useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user, navigate, userFolders, width]);
    
    const addNewFolder = async () => {
        window.scrollTo(0, 0);
        
        let value = "";
        const div = document.querySelector(".create-folder");
        const newFolder = document.createElement(`div`);
        newFolder.classList.add("new-folder");
        newFolder.innerHTML = `
            <input class="folder-input" type="text" value=${value}></input>
            <svg class="folder-button" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
            </svg>
        `
        document.querySelector(".create-folder__button").style.display = "none";
        div.prepend(newFolder);

        document.querySelector(".folder-input").addEventListener("change", e => {
            value = e.target.value;
        });

        document.querySelector(".folder-button").addEventListener("click", e => {
            e.preventDefault();

            if (value) {
                addNote(e, value);
                div.removeChild(newFolder);
                document.querySelector(".create-folder__button").style.display = "block";
            } else {
                alert("You should give your folder a name");
                document.querySelector(".folder-input").style.borderColor = "red"
            }
        });

    }

    const hideMenu = () => {

        if (width < 768) {

            setTimeout(() => {
                document.querySelector(".folders-button").style.display = "block";
                document.querySelector(".folders-button").style.transition = "all 1s linear";
            }, 100)
            document.querySelector(".folder-list").style.height = "0dvh";
            document.querySelector(".folder-list").style.overflow = "none";

        } else {
            return
        }
    }

    const showData = () => {
        if (!areFoldersLoaded) {
            return (
                <Loader size={10} />
            )

        } else {
            return userFolders?.map(folder => {
                return (
                    <NavLink onClick={hideMenu} key={folder.folderId} to={`/${folder.name}`} state={folder}><MenuButton name={folder.name} id={folder.folderId} deleteFolder={deleteFolder} custom={true}/></NavLink>
                )
            })
        }
    }

    const addNote = async (e, value) => {

        e.preventDefault();

        try {
            await addDoc(collection(db, "folders"), {
                uid: user.uid,
                name: value
            });
    
            setUpdatedFolders(!updatedFolders)
          } catch (e) {
            console.error("Error adding document: ", e);
            }
    }

    return (
        user ? <header className="side-menu">
            <div className="buttons">
                <div className="menu-buttons">
                    <p className="mt-3 mb-0">Folders</p>
                    <NavLink onClick={hideMenu} to={"/all"}><MenuButton name={"All notes"}/></NavLink>
                    <NavLink onClick={hideMenu} to={"/important"}><MenuButton name={"Important"}/></NavLink>
                    <NavLink onClick={hideMenu} to={"/deleted"}><MenuButton name={"Deleted"}/></NavLink>
                    {showData()}
            </div>
            <div className="create-folder">
                <button onClick={addNewFolder} className="create-folder__button">New folder</button>
            </div>
            </div>
        </header>
        :
        <div className="side-menu-login">
            <h1>Welcome to Notez!</h1>
        </div>
    )
}

export default SideMenu;