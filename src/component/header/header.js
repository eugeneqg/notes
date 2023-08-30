import React from "react";
import "./header.sass";
import { Navbar } from "react-bootstrap";
import { BoxArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router";


const Header = ({logOut, input}) => {

    const navigate = useNavigate();

    const handler = async (e) => {
        input.current = e.target.value;
        navigate("/search");
    }

    return (
        <Navbar className="header" expand="lg">
                <Navbar.Brand style={{color: "white"}} href="/">NOTEZ</Navbar.Brand>
                <input onChange={handler} value={input.current} className="me-5 search" placeholder="Search"></input>
                <BoxArrowLeft color="white" size={24} onClick={logOut}/>
        </Navbar>
    )
}

export default Header;