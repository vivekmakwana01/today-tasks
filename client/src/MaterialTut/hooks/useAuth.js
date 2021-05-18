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

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.NONE)
  .then(() => {})
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(`Persistence error: ${errorCode}: ${errorMessage}`);
  });

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
        return {
          success: true,
        };
      })
      .catch((error) => {
        return {
          success: false,
          data: error,
        };
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
      return {
        success: true,
        data: res.user,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  };

  const signInWithEmailAndPassword = async (formData) => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password);
      return {
        success: true,
        data: res.user,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
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
