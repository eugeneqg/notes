import "./App.sass";
import { Row, Col } from "react-bootstrap";
import SideMenu from "../component/side-menu/side-menu";
import { Routes, Route, redirect, useNavigate } from 'react-router-dom';
import MainPage from "../pages/main-page/main-page";
import ImportantPage from "../pages/important-page/important-page";
import RecentlyDeleted from "../pages/recently-deleted-page/recently-deleted-page";
import React from "react";
import CreateModal from "../component/create-modal/create-modal";
import LoginPage from "../pages/login-page/login-page";
import NotePage from "../pages/note-page/note-page";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, collection, db, logout } from "../firebase";
import { query, where, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { Fab } from "../component/small-components/small-components";
import FolderPage from "../pages/folder-page/folder-page";
import { Timestamp } from "firebase/firestore";
import Header from "../component/header/header";
import SearchPage from "../pages/search-page/search-page";

function App() {

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = React.useState([]);
  const [userFolders, setUserFolders] = React.useState([]);
  const [isDataLoaded, setDataLoaded] = React.useState(false);
  const [areFoldersLoaded, setFoldersLoaded] = React.useState(false);
  const [updatedComponent, setUpdatedComponent] = React.useState(false);
  const [page, setPage] = React.useState("");
  const ref = React.useRef("");
  const navigate = useNavigate();

  React.useEffect(() => {
    isModalOpen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "auto";

    if (user) {
      (async () => {
        const filteredNotes = [];
        const folders = [];

        const foldersRef = await collection (db, "folders");
        const notesRef = await collection(db, "notes");
        const q = query(notesRef, where("uid", "==", `${user.uid}`));
        const qF = query(foldersRef, where("uid", "==", `${user.uid}`))

        const querySnapshot = await getDocs(q);
        const folderSnapshot = await getDocs(qF);
        querySnapshot.forEach(i => {
          filteredNotes.push({...i.data(), noteId: i.id});
        });

        folderSnapshot.forEach(i => {
          folders.push({...i.data(), folderId: i.id});
        });

        setData(filteredNotes.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds));
        setUserFolders(folders.sort((a,b) => a === b ? 0 : a > b ? 1 : -1));
        setDataLoaded(true);
        setFoldersLoaded(true);
      })();

    } else {
      setData([]);
      setUserFolders([]);
      redirect("/");
    }

  }, [isModalOpen, user, updatedComponent, ref.current]);

  if (loading) {
    return (
      <p>loading</p>
    )
  }

  const handler = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  }

  const deleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete your note?")) {
      setUpdatedComponent(!updatedComponent);
      await deleteDoc(doc(db, "notes", id));
    };
  }

  const updateNote = async (id, title, text, folder) => {
    const ref = doc(db, "notes", id);
    setUpdatedComponent(!updatedComponent);
    await updateDoc(ref, {
      title: title,
      text: text,
      folder: folder
    });
  }

  const deleteFolder = async (id) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      navigate("/all");
      setUpdatedComponent(!updatedComponent);
      await deleteDoc(doc(db, "folders", id));
    };
  }

  const logOut =  async () => {
    await setData([]);
    await setUserFolders([]);
      logout();
      redirect("/");

}


  return (
    <div>
      {isModalOpen ? <CreateModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} page={page}/> : null}
      {user? <Fab fab="fab" name={"New note"} func={handler}/> : null}
      <Header data={data} setData={setData} logOut={logOut} input={ref}/>
      <Row className="gx-0">
        <Col md={user ? 2 : 4} className="p-0">
          <SideMenu logOut={logOut} setModalOpen={setModalOpen} setData={setData} userFolders={userFolders} updatedFolders={updatedComponent} setUpdatedFolders={setUpdatedComponent} deleteFolder={deleteFolder} areFoldersLoaded={areFoldersLoaded}/>
        </Col>
        <Col className="p-0">
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/all" element={<MainPage data={data} isDataLoaded={isDataLoaded} deleteNote={deleteNote} updatedNotes={updatedComponent} setUpdatedNotes={setUpdatedComponent}/>}/>
            <Route path="/important" element={<ImportantPage data={data} deleteNote={deleteNote}/>}/>
            <Route path="/deleted" element={<RecentlyDeleted/>}/>
            <Route path="/note" element={<NotePage updateNote={updateNote} deleteNote={deleteNote} userFolders={userFolders} areFoldersLoaded={areFoldersLoaded}/>}/>
            <Route path="/search" element={<SearchPage data={data} deleteNote={deleteNote} input={ref}/>} />
            {userFolders.map(folder => {
              return (
                <Route path={folder.name} key={folder.name} element={<FolderPage folderData={folder} data={data} setPage={setPage} deleteNote={deleteNote}/>}/>
              )
            })}
            <Route to="*" element={<MainPage data={data} isDataLoaded={isDataLoaded} deleteNote={deleteNote} updatedNotes={updatedComponent} setUpdatedNotes={setUpdatedComponent}/>} />
          </Routes> 
        </Col>
      </Row>
    </div>
  );
}

export default App;
