import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyApl2JR_VBdhHgh07zkinAnehdq4SiiGIo",
  authDomain: "notes-61687.firebaseapp.com",
  projectId: "notes-61687",
  storageBucket: "notes-61687.appspot.com",
  messagingSenderId: "315071382938",
  appId: "1:315071382938:web:daba99792dcf5d30c4a623",
};
firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const provider = new firebase.auth.GoogleAuthProvider();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const signInWithPopup = () => {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        return true;
      });
  };

  const createUserWithEmailAndPassword = async (formData) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password);
      await res.user.updateProfile({
        displayName: `${formData.firstName} ${formData.lastName}`,
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmailAndPassword = async (formData) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        return false;
      });
  };

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsAuthenticating(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const values = {
    user,
    signInWithPopup,
    logout,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};
