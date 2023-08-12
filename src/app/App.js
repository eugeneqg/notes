import "./App.sass";
import { Row, Col } from "react-bootstrap";
import SideMenu from "../component/side-menu/side-menu";
import { Routes, Route, redirect } from 'react-router-dom';
import MainPage from "../pages/main-page/main-page";
import ImportantPage from "../pages/important-page/important-page";
import RecentlyDeleted from "../pages/recently-deleted-page/recently-deleted-page";
import React from "react";
import CreateModal from "../component/create-modal/create-modal";
import LoginPage from "../pages/login-page/login-page";
import NotePage from "../pages/note-page/note-page";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, collection, db } from "../firebase";
import { query, where, getDocs } from "firebase/firestore";
import { Fab } from "../component/small-components/small-components";
import FolderPage from "../pages/folder-page/folder-page";



function App() {

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = React.useState([]);
  const [userFolders, setUserFolders] = React.useState([]);
  const [isDataLoaded, setDataLoaded] = React.useState(false);
  const [page, setPage] = React.useState("");

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
          folders.push({...i.data(), noteId: i.id});
        });

        setData(filteredNotes);
        setUserFolders(folders);
        setDataLoaded(true);
      })();

    } else {
      redirect("/");
    }

  }, [isModalOpen, user, userFolders]);

  if (loading) {
    return (
      <p>loading</p>
    )
  }

  const handler = () => {
    setModalOpen(true)
  }

  return (
    <div>
      {isModalOpen ? <CreateModal setModalOpen={setModalOpen} page={page}/> : null}
      <Fab fab="fab" name={"New note"} func={handler}/>
      <Row className="gx-0">
        <Col md={2} className="p-0">
          {user ? <SideMenu setModalOpen={setModalOpen} setData={setData} userFolders={userFolders}/> : null}
        </Col>
        <Col className="p-0">
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/all" element={<MainPage data={data} isDataLoaded={isDataLoaded}/>}/>
            <Route path="/important" element={<ImportantPage data={data}/>}/>
            <Route path="/deleted" element={<RecentlyDeleted/>}/>
            <Route path="/note" element={<NotePage />}/>
            {userFolders.map(folder => {
              return (
                <Route path={folder.name} element={<FolderPage folderData={folder} data={data} setPage={setPage}/>}/>
              )
            })}
          </Routes> 
        </Col>
      </Row>
    </div>
  );
}

export default App;
