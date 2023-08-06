import "./App.css";
import { Row, Col } from "react-bootstrap";
import SideMenu from "../component/side-menu/side-menu";
import { Routes, Route } from 'react-router-dom';
import MainPage from "../pages/main-page/main-page";
import ImportantPage from "../pages/important-page/important-page";
import RecentlyDeleted from "../pages/recently-deleted-page/recently-deleted-page";
import React from "react";
import CreateModal from "../component/create-modal/create-modal";

function App() {
  const [isModalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    isModalOpen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "auto";
  }, [isModalOpen])

  return (
    <div>
      {isModalOpen ? <CreateModal setModalOpen={setModalOpen}/> : null}
      <Row className="gx-0">
        <Col md={2} className="p-0">
          <SideMenu setModalOpen={setModalOpen}/>
        </Col>
        <Col className="p-0">
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/important" element={<ImportantPage/>}/>
            <Route path="/deleted" element={<RecentlyDeleted/>}/>
          </Routes> 
        </Col>
      </Row>
    </div>
  );
}

export default App;
