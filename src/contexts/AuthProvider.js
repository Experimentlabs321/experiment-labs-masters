import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  // Registering
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Adding image and name
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // sign in with email and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with provider
  const providerLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      []
    );

    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/users?email=${user?.email}`)
      .then((user) => {
        setUserInfo(user?.data);
      })
      .catch((error) => console.error(error));
  }, [user?.email, userInfo?.email]);

  const authInfo = {
    user,
    userInfo,
    createUser,
    updateUserProfile,
    loading,
    logOut,
    signIn,
    providerLogin,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
