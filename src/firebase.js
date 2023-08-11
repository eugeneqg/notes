import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAshcSmLMWX6PfrfyJ65cWaWvSZoHKRxXk",
    authDomain: "notes-app-qg.firebaseapp.com",
    projectId: "notes-app-qg",
    storageBucket: "notes-app-qg.appspot.com",
    messagingSenderId: "88949899381",
    appId: "1:88949899381:web:b4657285febbfaad10f83c",
    measurementId: "G-4P6LFV48R2"
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