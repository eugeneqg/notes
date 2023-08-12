import "./login-page.sass";
import { auth, logInWithEmailAndPassword, signInWithGoogle, registerWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";

const LoginPage = () => {

    const [email, setEmail] = React.useState("");
    const [isNew, setNew] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = React.useState("");
    const navigate = useNavigate();

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
            <div>
                <p onClick={() => setNew(!isNew)}>Already registred?</p>
            </div>
            {isNew ? <NewUser name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} register={register}/> : <ExistingUser email={email} setEmail={setEmail} password={password} setPassword={setPassword} logInWithEmailAndPassword={logInWithEmailAndPassword}/>}
        </div>
    )
}

export default LoginPage;

const NewUser = ({name, setName, email, setEmail, password, setPassword, register}) => {
    return (
        <div className="login-page__login">
            <input className="login-page__input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}></input>
            <input className="login-page__input" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input className="login-page__input" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={register}>Sing In</button>
        </div>
    )
}

const ExistingUser = ({email, setEmail, password, setPassword, logInWithEmailAndPassword}) => {
    return (

            <div className="login-page__login">
                <input className="login-page__input" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input className="login-page__input" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={() => logInWithEmailAndPassword(email, password)}>Sing In</button>
            </div>
    )
}