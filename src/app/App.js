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
import Header from "../component/header/header";
import SearchPage from "../pages/search-page/search-page";
import Loader from "../component/small-components/loader/loader";

function App() {

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = React.useState([]);
  const [userFolders, setUserFolders] = React.useState([]);
  const [isDataLoaded, setDataLoaded] = React.useState(false);
  const [areFoldersLoaded, setFoldersLoaded] = React.useState(false);
  const [updatedComponent, setUpdatedComponent] = React.useState(false);
  const [page, setPage] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const [width, setWidth] = React.useState();
  const ref = React.useRef("");
  const navigate = useNavigate();

  React.useEffect(() => {
    isModalOpen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "auto";

    if (user) {
      window.scrollTo(0, 0);
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

    if (error) {
      alert("Oops! Something's wrong :( Try again later")
    }

    setWidth(window.innerWidth);

  }, [isModalOpen, user, updatedComponent, ref, page, error, width]);

  if (loading) {
    return (
      <Loader />
    )
  }

  const showFolders = () => {
    document.querySelector(".folders-button").style.display = "none";
    document.querySelector(".folder-list").style.height = "100dvh";
    document.querySelector(".folder-list").style.overflow = "auto";
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

  const updateNote = async (id, title, text, folder = "", important, deleted) => {
    const ref = doc(db, "notes", id);
    setUpdatedComponent(!updatedComponent);
    await updateDoc(ref, {
      title: title,
      text: text,
      folder: folder,
      important: important,
      deleted: deleted
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
      {isModalOpen ? <CreateModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} page={page} userFolders={userFolders}/> : null}
      {user ? <Fab fab="fab" name={"New note"} func={handler}/> : null}
      {user ? <Header data={data} setData={setData} input={searchInput} setSearchInput={setSearchInput} logOut={logOut} /> : null}
      <Row className="gx-0">
        <Col md={user ? 3 : 4} lg={2} className="p-0 folder-list">
          <SideMenu logOut={logOut} setModalOpen={setModalOpen} setData={setData} userFolders={userFolders} updatedFolders={updatedComponent} setUpdatedFolders={setUpdatedComponent} deleteFolder={deleteFolder} areFoldersLoaded={areFoldersLoaded} width={width}/>
        </Col>
        {user? <button onClick={showFolders} className="folders-button">My folders</button> : null}
        <Col className="p-0">
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/all" element={<MainPage data={data} isDataLoaded={isDataLoaded} deleteNote={deleteNote} updatedNotes={updatedComponent} setUpdatedNotes={setUpdatedComponent} updateNote={updateNote} setPage={setPage}/>}/>
            <Route path="/important" element={<ImportantPage data={data} updateNote={updateNote} deleteNote={deleteNote}/>}/>
            <Route path="/deleted" element={<RecentlyDeleted data={data} updateNote={updateNote} deleteNote={deleteNote}/>}/>
            <Route path="/note/:id" element={<NotePage data={data} updateNote={updateNote} deleteNote={deleteNote} userFolders={userFolders} areFoldersLoaded={areFoldersLoaded} updatedComponent={updatedComponent} setUpdatedComponent={setUpdatedComponent}/>}/>
            <Route path="/search" element={<SearchPage data={data} deleteNote={deleteNote} input={searchInput}/>} />
            {userFolders.map(folder => {
              return (
                <Route path={folder.name} key={folder.name} element={<FolderPage folderData={folder} data={data} setPage={setPage} updateNote={updateNote} deleteNote={deleteNote}/>}/>
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
