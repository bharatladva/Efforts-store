/** @format */

import React, { useContext, useState, useEffect } from "react";

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

import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

import { auth } from "../../firebase.js";

const API_URL = process.env.API_URL;

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

					const newUser = {
						uid: user.uid,
						username: user.displayName,
						email: user.email,
						favorites: [],
						orders: [],
						ratings: [],
						cart: [],
						address: [],
					};

					const response = await fetch(`${API_URL}/user/createUser`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newUser),
					});

					const data = await response.json();
					console.log("userCreated", data);

					return user;
				} catch (error) {
					throw error;
				}
			})
			.catch((error) => {
				console.error("Error:", error);
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
		const credential = EmailAuthProvider.credential(user.email, currentPassword);

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

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
