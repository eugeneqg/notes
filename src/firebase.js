import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIN--WEbnDASyVR0Ytd3iHm6Yd_X4t-3Q",
  authDomain: "react-note-app-qg.firebaseapp.com",
  projectId: "react-note-app-qg",
  storageBucket: "react-note-app-qg.appspot.com",
  messagingSenderId: "304377943595",
  appId: "1:304377943595:web:0358172d683aabf8f5fc6e",
  measurementId: "G-JS4W6D0B1K"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

const db = await getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {

  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }

};

const logInWithEmailAndPassword = async (email, password) => {

    try {
      await signInWithEmailAndPassword(auth, email, password);

    } catch (err) {
      console.error(err);
      alert(err.message);
    }

};

const registerWithEmailAndPassword = async (name, email, password) => {

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

};

const sendPasswordReset = async (email) => {

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

};

const logout = () => {

    signOut(auth);

};

export { auth, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout, db, collection };