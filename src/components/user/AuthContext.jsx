import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

import { auth } from "../../firebase.js";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Update the user's profile with the provided username
        try {
          await updateProfile(user, {
            displayName: username,
          });

          axios
						.post("https://moviemind-server.onrender.com/createUser", {
							uid: user.uid,
							name: user.displayName,
							email: user.email,
						})
						.then((response) => {
							console.log("Response:", response.data);
						})
						.catch((error) => {
							console.error("Error:", error);
						});
          return user;
        } catch (error) {
          // Handle the error when updating the user's profile
          throw error;
        }
      })
      .catch((error) => {
        // Handle the error when creating the user
        throw error;
      });
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    // signInWithRedirect(auth, provider);
  };

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return updateEmail(auth, currentUser, email);
  }

  function updatePassword(currentPassword, newPassword) {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return reauthenticateWithCredential(user, credential).then(() => {
      return updatePassword(user, newPassword);
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
