import "./App.css";
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



function App() {

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = React.useState([]);
  const [isDataLoaded, setDataLoaded] = React.useState(false)

  React.useEffect(() => {
    isModalOpen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "auto";

    if (user) {
      (async () => {
        const filteredNotes = [];
        const notesRef = await collection(db, "notes");
        const q = query(notesRef, where("uid", "==", `${user.uid}`));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((i) => {
          filteredNotes.push({...i.data(), noteId: i.id});
        });
        setData(filteredNotes);
        setDataLoaded(true)
      })();

    } else {
      redirect("/");
    }

  }, [isModalOpen, user]);

  if (loading) {
    return (
      <p>loading</p>
    )
  }

  return (
    <div>
      {isModalOpen ? <CreateModal setModalOpen={setModalOpen}/> : null}
      <Row className="gx-0">
        <Col md={2} className="p-0">
          <SideMenu setModalOpen={setModalOpen} setData={setData}/>
        </Col>
        <Col className="p-0">
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/all" element={<MainPage data={data} isDataLoaded={isDataLoaded}/>}/>
            <Route path="/important" element={<ImportantPage data={data}/>}/>
            <Route path="/deleted" element={<RecentlyDeleted/>}/>
            <Route path="/note" element={<NotePage />}/>
          </Routes> 
        </Col>
      </Row>
    </div>
  );
}

export default App;
