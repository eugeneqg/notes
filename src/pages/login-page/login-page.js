import "./login-page.sass";
import { auth, logInWithEmailAndPassword, registerWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import React from "react";
import {CreateButton} from "../../component/small-components/small-components"

const LoginPage = () => {

    const [email, setEmail] = React.useState("");
    const [isNew, setNew] = React.useState(true);
    const [password, setPassword] = React.useState("");
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = React.useState("");
    const [leftPosition, setLeftPosition] = React.useState("0%")
    const navigate = useNavigate();
    const ref = React.useRef();

    const change = (e) => {

        if (leftPosition === "0%") {
            ref.current.style.left = "50%";
            setLeftPosition("50%");
            setNew(false);
        } else {
            ref.current.style.left = "0%";
            setLeftPosition("0%");
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
            navigate("/");
        }
        if (error) {
            alert("Something wrong! Try again later :(");
        }

      }, [user, loading, navigate, isNew, error, leftPosition]);

    return (
        <div className="login-page">
            <h1 className="margin-h1 mobile-welcome">Welcome to Notez!</h1>
            <div className="login-page__login">
                <div className="login-page_buttons d-flex w-100">
                    <div ref={ref} className="slider"></div>
                    <div onClick={change} id="existing" className="slider-button">
                        <p style={isNew ? null : {color: "black"}}>I have an account</p>    
                    </div>
                    <div onClick={change} id="new" className="slider-button">
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