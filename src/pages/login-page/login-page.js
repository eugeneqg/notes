import "./login-page.sass";
import { auth, logInWithEmailAndPassword, signInWithGoogle, registerWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import { doc } from "firebase/firestore";
import {CreateButton} from "../../component/small-components/small-components"

const LoginPage = () => {

    const [email, setEmail] = React.useState("");
    const [isNew, setNew] = React.useState(true);
    const [password, setPassword] = React.useState("");
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = React.useState("");
    const navigate = useNavigate();

    const change = (e) => {
        const slider = document.querySelector(".slider")
        const leftPos = slider.style.left;
        if (leftPos === "0%") {
            slider.style.left = "50%";
            setNew(false);
        } else {
            slider.style.left = "0%";
            setNew(true);
        }
    }

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
      };

    React.useEffect(() => {
        if (loading) {
          return;
        }
        if (user) {
            navigate("/all");
        } else {
            navigate("/")
        }
      }, [user, loading, navigate, isNew]);

    return (
        <div className="login-page">
            <div className="login-page__login">
                <div className="login-page_buttons d-flex w-100">
                    <div className="slider"></div>
                    <div onClick={change} className="slider-button">
                        <p style={isNew ? null : {color: "black"}}>I have an account</p>    
                    </div>
                    <div onClick={change} className="slider-button">
                        <p style={isNew ? {color: "black"} : null}>I'm new</p>   
                    </div>
                </div>
                {isNew ? <ExistingUser email={email} setEmail={setEmail} password={password} setPassword={setPassword} logInWithEmailAndPassword={logInWithEmailAndPassword} setNew={setNew} isNew={isNew} change={change}/> : <NewUser name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} register={register} setNew={setNew} isNew={isNew} change={change}/>}
            </div>
        </div>
    )
}

export default LoginPage;

const NewUser = ({name, setName, email, setEmail, password, setPassword, register, setNew, isNew, change}) => {

    return (
        <>
            <input className="login-page__input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}></input>
            <input className="login-page__input" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input className="login-page__input" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <CreateButton name={"Create an account"} func={register} />
        </>
    )
}

const ExistingUser = ({email, setEmail, password, setPassword, logInWithEmailAndPassword, setNew, isNew, change}) => {
    return (

            <>
                <input className="login-page__input" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input className="login-page__input" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <CreateButton name={"Sign In"} func={() => logInWithEmailAndPassword(email, password)} />
            </>
    )
}