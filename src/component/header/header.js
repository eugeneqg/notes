import React from "react";
import "./header.sass";
import { Navbar } from "react-bootstrap";
import { BoxArrowLeft, Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router";


const Header = ({logOut, input, setSearchInput}) => {

    const navigate = useNavigate();
    const [isSearchShown, setSearchShown] = React.useState(false);
    const ref = React.useRef();

    const handler = async (e) => {
        setSearchInput(e.target.value);
        navigate("/search");
    }

    const changeSearch = () => {
        setSearchShown(true);
    }

    const showSearch = () => {
        if (!isSearchShown) {
            return (
                <Search className="search-button" onClick={changeSearch} color="white"/>
            )
        } else {
            return (
                <input ref={ref} onChange={handler} value={input} className="me-5 search" placeholder="Search"></input>
            )
        }
    }

    React.useEffect(() => {

        const listener = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setSearchShown(false);
            }
        }

        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);

    }, [isSearchShown, ref])

    return (
        <Navbar className="header" expand="lg">
                <Navbar.Brand style={{color: "white"}} href="/">NOTEZ</Navbar.Brand>
                <div className="d-flex align-items-center gap-2">
                    {window.innerWidth > 430 ? 
                        <input onChange={handler} value={input} className="me-5 search" placeholder="Search"></input>
                        :
                        showSearch()
                    }
                    <BoxArrowLeft color="white" size={24} onClick={logOut}/>
                </div>
        </Navbar>
    )
}

export default Header;